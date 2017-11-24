import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// Nom de la base de donnée
const DB_NAME : string = 'listeCourses.db';

// Pages en relation
import { FormArticlePage } from '../formArticle/formArticle';

@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})

export class ArticlePage {
  items: Array<string>;
  tabArt: Array<{idArt: number, article: string, refIdCat : number}>;
  tabCat: Array<{idCat: number, categorie: string}>;
  selectedItem: any;
  filterContain: string; 
  private logString: string = 'Sélectionner des articles à ajouter à la liste des courses';
  dbase: SQLiteObject;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private sqlite: SQLite) {
    
    this.filterContain="";
    this.createDB();
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter :');
    if (this.dbase != null) {
      this.setDatasArticles();
    } else {
      this.createDB();
    }
  }

  private createDB() : void {
    this.sqlite.create({
      name: DB_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => { 
      //console.log('Base créée');
      this.dbase = db;
      this.setDatasArticles();
      })
    .catch(e => "Erreur lors de la création de la base : " + e);  
  }

  private setDatasArticles() {
    // Requête sélection : afficher la liste des courses
    this.dbase.executeSql('SELECT * FROM ARTICLES ORDER BY upper(Intitule) ASC', {})
    .then(res => {
      this.initTab(res);
    })
    .catch(e => console.log("Erreur setDatasArticles : " + e + " " + e.description));
  }

  private initTab(res : any){
    this.tabArt = [];
    for(var i=0; i<res.rows.length; i++) {
      this.tabArt.push({
        idArt: res.rows.item(i).idArt, 
        article: res.rows.item(i).Intitule,
        refIdCat: res.rows.item(i).fkIdCat
      });
    }
  }

  filterArticles(ev: any) {
    this.dbase.executeSql('SELECT * FROM ARTICLES ORDER BY upper(Intitule) ASC', {})
    .then(res => {
      this.initTab(res);
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.tabArt = this.tabArt.filter(
          function(item) {
            return item.article.toLowerCase().includes(val.toLowerCase()); 
          }
        );
      }
    })
    .catch(e => console.log("Erreur lors du filtrage des articles : " + e + " " + e.description));
  }

  addArticle() {
    // Open the page in mode Add
    this.navCtrl.push(FormArticlePage, {openMode : "Ajouter"}); 
    //console.log("Article ajouté");
  }

  deleteArticle(event, item) {
    let alert = this.alertCtrl.create({
      title: 'Attention suppression !',
      subTitle: 'La suppression de l\'article supprimera aussi tous les articles de la liste de courses. Voulez vous continuer ?',
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
            
              // Requête Suppression
              var qDef="DELETE FROM ARTICLES WHERE idArt=" + item.idArt;
              this.dbase.executeSql(qDef, {})
              .then(res => {
                //console.log("Article " + item.article + " supprimée (id=" + item.idArt + ")");
                this.filterContain = "";
                this.setDatasArticles();
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

  editArticle(event, item) {
    // A faire : rajouter les arguments Article et idArticle (soit la variable 'item')
    this.navCtrl.push(FormArticlePage, {idArt: item.idArt, article: item.article, refIdCat : item.refIdCat, openMode : "Modifier"});
  }

  addArticleToList(event, item) {
    let prompt = this.alertCtrl.create({
      //title: 'Login',
      message: "Indiquer la quantité à prendre",
      inputs: [
        {
          name: 'qty',
          placeholder: 'Quantité'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            var qDef="INSERT INTO COURSES (fkIdArt, qty) VALUES(" + item.idArt + ", '" + data.qty + "')";
            //console.log(qDef);
            this.dbase.executeSql(qDef, {})
            .then(res => {
              this.logString = item.article + " ajouté à la liste";
              if (data.qty != '') {
                this.logString = this.logString + " (Qté :" + data.qty + ")";
              }
            })
            .catch(e => console.log("Erreur insertion dans liste : " + e + " " + e.description));
          }
        }
      ]
    });
    prompt.present();    
  }
}