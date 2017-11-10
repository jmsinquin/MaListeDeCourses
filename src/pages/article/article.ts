import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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
  openMode: string;
  //testRadioOpen: boolean;
  //testRadioResult;

  ngOnInit() {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    
    this.filterContain="";
    this.setArticles();
  }

  setArticles() {
    this.tabArt=[];
    this.tabArt.push({idArt: 0, article: 'Steak haché', refIdCat: 1});
    this.tabArt.push({idArt: 1, article: 'Bifteak', refIdCat: 1});
    this.tabArt.push({idArt: 2, article: 'Baguette', refIdCat: 2});
    this.tabArt.push({idArt: 3, article: 'Brioche', refIdCat: 2});
    this.tabArt.push({idArt: 4, article: 'Bananes', refIdCat: 5});
    this.tabArt.push({idArt: 5, article: 'Pommes de terre', refIdCat: 5});
    this.tabArt.push({idArt: 6, article: 'Crayon HB', refIdCat: 6});
    this.tabArt.push({idArt: 7, article: 'Serpillère', refIdCat: 8});
    this.tabArt.push({idArt: 8, article: 'Produit anti-fourmis', refIdCat: 7});
    this.tabArt.push({idArt: 9, article: 'Passer à la banque', refIdCat: 0});
    this.tabArt.push({idArt: 10, article: 'Trouver un cadeau pour Bébert', refIdCat: 0});
    this.tabArt.push({idArt: 11, article: 'Pile AAA', refIdCat: 0});
  }

  setCategories() {
    this.tabCat=[];
    this.tabCat.push({idCat: 0, categorie: 'Vrac'});
    this.tabCat.push({idCat: 1, categorie: 'Boucher'});
    this.tabCat.push({idCat: 2, categorie: 'Boulangerie'});
    this.tabCat.push({idCat: 3, categorie: 'Poissonnerie'});
    this.tabCat.push({idCat: 4, categorie: 'Sous vide'});
    this.tabCat.push({idCat: 5, categorie: 'Fruits et légumes'});
    this.tabCat.push({idCat: 6, categorie: 'Papeterie'});
    this.tabCat.push({idCat: 7, categorie: 'Droguerie'});
    this.tabCat.push({idCat: 8, categorie: 'Entretien'});
  }

  filterArticles(ev: any) {
    this.setArticles();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.tabArt = this.tabArt.filter(
        function(item) {
          return item.article.toLowerCase().includes(val.toLowerCase()); 
        }
      );
    }
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
            console.log("Article " + item.article + " supprimé (id=" + item.idArt + ")");
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
    console.clear();
    /** 
    // Affiche l'id de la sélection
    console.log("id : " + item.idArt);
    // Affiche la article de la sélection
    console.log("Article : " + item.article);
    // Affiche le nombre d'éléments dans la liste
    console.log("Nbre d'éléments : " + this.tabArt.length);
    // Affiche le filtre
    console.log("Filtre : " + this.filterContain);
    */

    console.log("Article " + item.article + " ajouté à la liste des courses (id=" + item.idArt + ")");

  }
}