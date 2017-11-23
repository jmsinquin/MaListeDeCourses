import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// Import de SQLite
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Pages en relation
import { ArticlePage } from '../article/article';

// Nom de la base de donnée
const DB_NAME : string = 'listeCourses.db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  filterContain: string;
  tabListe : Array<{idCat: number, categorie: string, sTab: any}>;
  tabSub: Array<{idCourse: number, article: string, qty: string}>;
  dbase: SQLiteObject;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    private sqlite: SQLite) { 
      this.filterContain="";  
      //this.createDB();  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad :');
    this.createDB();
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter :');
    console.log("dBase = " + this.dbase);
    if (this.dbase != null) {
      this.showDatas();
    } else {
      this.createDB();
    } 
  }

  toto() {
    console.log("************** TOTO :");
    var qDef: string = "SELECT * FROM COURSES";
    this.dbase.executeSql(qDef, {})
    .then(res => {
      for(var i=0; i<res.rows.length; i++) {
        console.log(res.rows.item(i).idCourse + " " + res.rows.item(i).fkIdArt + " " + res.rows.item(i).qty);
      }
    })
    .catch(e => "Erreur lors de l\'exécution de la requête qDef : " + e);
  }

  private createDB() : void {
    console.log('Methode createDB :');
    this.sqlite.create({
      name: DB_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => { 
      console.log('Base créée');
      this.dbase = db;
      //Création des tables
      this.createTables();
    })
    .catch(e => "Erreur lors de la création de la base : " + e);
  }

  private createTables() : void {
    console.log('Methode createTables :');
    
    // Création ou déclaration table CATEGORIES
    this.dbase.executeSql('CREATE TABLE IF NOT EXISTS CATEGORIES (idCat INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, Cat VARCHAR(50))', {})
    .then(res => {
      console.log('Création table CATEGORIES');
      
      // Création de la table ARTICLES
      this.dbase.executeSql('CREATE TABLE IF NOT EXISTS ARTICLES (idArt INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, Intitule VARCHAR(50) NOT NULL, fkIdCat INTEGER, CONSTRAINT fk_1 FOREIGN KEY (fkIdCat) REFERENCES CATEGORIES(idCat) ON DELETE CASCADE )', {})
      .then(res => {
        console.log('Création table ARTICLES');
        
        // Création ou déclaration table COURSES
        this.dbase.executeSql("CREATE TABLE IF NOT EXISTS COURSES (idCourse INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, qty VARCHAR(25), fkIdArt INTEGER, CONSTRAINT fk_2 FOREIGN KEY (fkIdArt) REFERENCES ARTICLES(idArt) ON DELETE CASCADE )", {})
        .then(res => {
          console.log('Création table COURSES');

          // Ajouter les données dans le tableau tableau tabListe
          this.showDatas();
        })
        .catch(e => console.log("erreur création table COURSE " + e));
      })
      .catch(e => console.log("erreur création table ARTICLES " + e));
    })
    .catch(e => console.log("erreur création table CATEGORIES " + e));
  }


  private showDatas() {
    // Requête sélection : sélectionner les catégories contenant des articles
    var       qDefCat = "SELECT CATEGORIES.idCat, CATEGORIES.Cat ";
    qDefCat = qDefCat + "FROM (CATEGORIES INNER JOIN ARTICLES ON CATEGORIES.idCat = ARTICLES.fkIdCat) INNER JOIN COURSES ON ARTICLES.idArt = COURSES.fkIdArt ";
    qDefCat = qDefCat + "GROUP BY CATEGORIES.idCat, CATEGORIES.Cat ";
    qDefCat = qDefCat + "ORDER BY Cat ASC";
    console.log(qDefCat);
    this.dbase.executeSql(qDefCat, {})
    .then(res => {
      var       qDefArt = "SELECT CATEGORIES.Cat, COURSES.idCourse, ARTICLES.Intitule, COURSES.qty, CATEGORIES.idCat ";
      qDefArt = qDefArt + "FROM (CATEGORIES INNER JOIN ARTICLES ON CATEGORIES.idCat = ARTICLES.fkIdCat) INNER JOIN COURSES ON ARTICLES.idArt = COURSES.fkIdArt ";
      qDefArt = qDefArt + "ORDER BY CATEGORIES.Cat ASC, ARTICLES.Intitule ASC";
      console.log(qDefArt);
      this.dbase.executeSql(qDefArt, {})
      .then(resArt => {
        this.tabListe = [];
        var j=0;  //Pour le parcours du sous-tableau
        console.log("Req exec : ");
        
        for(var i=0; i<res.rows.length; i++) {
          console.log(res.rows.item(i).Cat);
          //console.log(j + "->j) ");
          this.tabSub=[];
          while ( (j<resArt.rows.length) && (res.rows.item(i).idCat == resArt.rows.item(j).idCat) ) {
            // Sous tableau :
            this.tabSub.push({
              idCourse: resArt.rows.item(j).idCourse, 
              article: resArt.rows.item(j).Intitule, 
              qty: resArt.rows.item(j).qty
            });
            console.log("..." + resArt.rows.item(j).Intitule + " " + resArt.rows.item(j).qty);
            j++;
          }
          // Tableau principal :
          this.tabListe.push({
            idCat: res.rows.item(i).idCat,
            categorie: res.rows.item(i).Cat,
            sTab: this.tabSub
          });
        }
        this.toto();
      })
      .catch(f => console.log("Erreur lors de la création de la requête qDefArt : " + f + " " + f.description));
    })
    .catch(e => console.log("Erreur lors de la création de la requête qDefCat : " + e + " " + e.description));
  }

  removeArticle(event, item) {
    var qDef: string = "DELETE FROM COURSES WHERE idCourse=" + item.idCourse;
    console.log(qDef);
    this.dbase.executeSql(qDef, {})
    .then(res => {
      this.showDatas();
      console.log("Article " + item.article + " enlevé de la liste (id=" + item.idCourse + ")");
    })
    .catch(e => console.log("Erreur lors de la suppression de l'article dans la liste de courses : " + e + " " + e.description));
  }

  addArticle() {
    // Open the page Article
    this.navCtrl.push(ArticlePage); 
  }
}
