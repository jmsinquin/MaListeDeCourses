//import { Component, ViewChild  } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// Nom de la base de donnée
const DB_NAME : string = 'listeCourses.db';

@Component({
  selector: 'page-formArticle',
  templateUrl: 'formArticle.html'
})


export class FormArticlePage {
  //ViewChild pour accéder aux objets de la page html (ici le input)
  //@ViewChild('input') myInput: Input;
  tabCat: Array<{idCat: number, categorie: string}>;
  idArt: number;
  article: string;
  refIdCat: number;
  openMode: string;
  dbase: SQLiteObject;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private sqlite: SQLite) {
    //Recupération des paramètres passé si en mode edit
    this.idArt = navParams.get('idArt');
    this.article = navParams.get('article');
    this.refIdCat = navParams.get('refIdCat');
    this.openMode = navParams.get('openMode');
    //this.setCategories();
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
    var qDef="SELECT * FROM CATEGORIES ORDER BY Cat ASC";
    this.dbase.executeSql(qDef, {})
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

  addArticle() {
    if (this.article != null && this.refIdCat !=-1) {
      var qDef="";
      if (this.openMode == "Ajouter") {
        // Requête INSERT INTO
        qDef="INSERT INTO ARTICLES (Intitule, fkIdCat) VALUES('" + this.article + "', " + this.refIdCat + ")";
      } else {
        // Requête UPDATE
        qDef="UPDATE ARTICLES SET Intitule = '" + this.article + "', fkIdCat=" + this.refIdCat + " WHERE idArt=" + this.idArt;
      }
      console.log(qDef);
      this.dbase.executeSql(qDef, {})
      .then(res => {
        console.log(this.article + ' ajouté (id catégorie=' + this.refIdCat + ')');
        this.setDatas();
        })
      .catch(e => console.log("Erreur lors de l'ajout de l\'article : " + e + " " + e.description));
      //Return to previous page
      this.navCtrl.pop();
    } else {
      if (this.article == null) {
        //Message renseigner article
        this.messageErreur("Renseigner l'article !")
        //Donner focus sur la inputbox
        //Ne fonctionne pas (perte focus après avoir clique OK)
        //this.focusInput(this.myInput); 
      } else {
        //Message renseigner une catégorie
        this.messageErreur("Renseigner la catégorie !")
      }
    }
  }

  private messageErreur(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Erreur !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
/*
  ionViewDidLoad() {
    this.focusInput();
  }

  //Donne le focus à l'input
  focusInput() {
    setTimeout(() => { this.myInput.setFocus(); }, 500);
  }
*/
}