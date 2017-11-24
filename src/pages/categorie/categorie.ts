import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
// Import de SQLite
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// Nom de la base de donnée
const DB_NAME : string = 'listeCourses.db';

@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html'
})

export class CategoriePage {
  items: Array<string>;
  tabCat: Array<{idCat: number, categorie: string}>;
  selectedItem: any;
  filterContain: string;
  dbase: SQLiteObject;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private sqlite: SQLite) {
    
    this.filterContain="";
    
  }

  ionViewDidLoad() {
    this.createDB();
  }

  private createDB() : void {
    this.sqlite.create({
      name: DB_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => { 
      //console.log('Base créée');
      this.dbase = db;
      this.setDatas();      
      })
    .catch(e => "Erreur lors de la création de la base : " + e);  
  }

  private setDatas() {
    // Requête sélection : afficher la liste des courses
    this.dbase.executeSql('SELECT * FROM CATEGORIES ORDER BY upper(Cat) ASC', {})
    .then(res => {
      this.initTab(res);
    })
    .catch(e => console.log("Erreur setDatas : " + e + " " + e.description));
  }

   private initTab(res : any){
    this.tabCat = [];
    for(var i=0; i<res.rows.length; i++) {
      this.tabCat.push({idCat: res.rows.item(i).idCat, categorie: res.rows.item(i).Cat });
    }
   }

  filterCategories(ev: any) {
    //this.setCategories();
    this.dbase.executeSql('SELECT * FROM CATEGORIES ORDER BY upper(Cat) ASC', {})
    .then(res => {
      this.initTab(res);
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.tabCat = this.tabCat.filter(
          function(item) {
            return item.categorie.toLowerCase().includes(val.toLowerCase()); 
          }
        );
      }
    })
    .catch(e => console.log("Erreur lors du filtrage : " + e + " " + e.description));
  }

  addCategorie() {
    let alert = this.alertCtrl.create({
      title: 'Ajouter catégorie',
      //subTitle: 'Modification :',
      inputs: [
        {
          name: 'tboxCategorie',
          placeholder: 'Entrer une catégorie'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Opération annulée');
          }
        },
        {
          text: 'OK',
          handler: data => {
            if (data.tboxCategorie != undefined && data.tboxCategorie.trim() != "") {
              data.tboxCategorie = this.inputCheck(data.tboxCategorie);
              // Requête ajout
              this.dbase.executeSql("INSERT INTO CATEGORIES(Cat) VALUES('" + data.tboxCategorie + "')", {})
              .then(res => {
                //console.log("Catégorie " + data.tboxCategorie + " ajoutée");
                this.setDatas();
              })
              .catch(e => console.log("Erreur lors de l'ajout de la catégorie : " + e + " " + e.description));
            }
          }
        }
      ]
    });
    alert.present();
  }

  deleteCategorie(event, item) {
    let alert = this.alertCtrl.create({
      title: 'Attention suppression !',
      subTitle: 'La suppression de la catégorie supprimera aussi tous les articles de cette catégorie. Voulez vous continuer ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Opération annulée');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.dbase.executeSql('PRAGMA foreign_keys=ON', {})
            .then(res => {
              // Requête Suppression de la catégorie à supprimer
              var qDefCat: string =  "DELETE FROM CATEGORIES WHERE idCat=" + item.idCat;
              //console.log(qDefCat);
              this.dbase.executeSql(qDefCat, {})
              .then(res => {
                //console.log("Catégorie " + item.categorie + " supprimée (id=" + item.idCat + ")");
                this.filterContain = "";
                this.setDatas();
              })
              .catch(f => console.log("Erreur lors de la suppression de la catégorie : " + f + " " + f.description));
            })
            .catch(e => console.log("Erreur PRAMA : " + e + " " + e.description));
          }
        }
      ]
    });
    alert.present();
  }

  editCategorie(event, item) {
    let alert = this.alertCtrl.create({
      title: 'Modifier catégorie',
      //subTitle: 'Modification :',
      inputs: [
        {
          name: 'tboxCategorie',
          placeholder: 'Entrer une catégorie',
          value : item.categorie
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Opération annulée');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log("data.tboxCategorie : " + data.tboxCategorie);
            if (data.tboxCategorie != undefined && data.tboxCategorie.trim() != '') {
              data.tboxCategorie = this.inputCheck(data.tboxCategorie);
              this.dbase.executeSql("UPDATE CATEGORIES SET Cat ='" + data.tboxCategorie + "' WHERE idCat=" + item.idCat, {})
              .then(res => {
                console.log("Catégorie " + item.categorie + " modifiée (id=" + item.idCat + ")");
                this.filterContain = "";
                this.setDatas();
              })
              .catch(e => console.log("Erreur lors de l'édition de la catégorie : " + e + " " + e.description));
            }             
          }
        }
      ]
    });
    alert.present();
  }

  private inputCheck(st : string) : string {
    st = st.trim();
    st = st.replace(/'/g, "''");
    return st;
  }
}