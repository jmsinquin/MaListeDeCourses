import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-formArticle',
  templateUrl: 'formArticle.html'
})


export class FormArticlePage {
  //ViewChild pour accéder aux objets de la page html (ici le input)
  @ViewChild('input') myInput: Input;
  tabCat: Array<{idCat: number, categorie: string}>;
  idArt: number;
  article: string;
  refIdCat: number;
  openMode: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    //Recupération des paramètres passé si en mode edit
    this.idArt = navParams.get('idArt');
    this.article = navParams.get('article');
    this.refIdCat = navParams.get('refIdCat');
    this.openMode = navParams.get('openMode');
    console.log(this.openMode);
    this.setCategories();
  }

  //A modifier par une requête SQL
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

  private addArticle() {
    if (this.article != null && this.idCat !=-1) {
      console.log(this.article + ' ajouté (id catégorie=' + this.refIdCat + ')');
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

  ionViewDidLoad() {
    this.focusInput();
  }

  //Donne le focus à l'input
  focusInput() {
    setTimeout(() => { this.myInput.setFocus(); }, 500);
  }
}