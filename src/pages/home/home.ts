import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  filterContain: string;
  //article: string;
  //qty: string;
  //categorie : string;
  tabListe: Array<{idListe: number, article: string, categorie : string, qty : string}>;
  toto : Array<{categorie: string, detail: [{idListe: number, article: string, qty : string}]}>;

  //items: Array<{title: string, note: string}>;
  //categories: Array<{title: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController) {

    //this.items = [];
    //this.categories = [];
    this.filterContain="";
    this.setListe();
    
    /*
    for (let i = 1; i < 5; i++) {
      this.items.push({
        title: 'Article ' + i,
        note: 'Qté : ' + i
      });
      // console.log("Article"+i);
    }

    for (let i = 1; i < 4; i++) {
      this.categories.push({
        title: 'Catégorie ' + i
      });
     // console.log("categorie"+i);
    }
    */
  }

  setListe() {
    this.toto=[];
    this.toto.push({
      categorie: 'Boucherie', 
        detail: [
          {idListe: 0, article: 'Steak haché', qty: '250 g'},
          {idListe: 1, article: 'Bifteak', qty: '1 kg'}
        ]
      }
    );
    this.toto.push({
      categorie: 'Boulangerie', 
      detail: [
        {idListe: 2, article: 'Baguette', qty: '1'},
        {idListe: 3, article: 'Bricohe', qty: '1'}
        ]
      }
    );
    this.toto.push({
      categorie: 'Fruits et légumes', 
      detail: [
        {idListe: 4, article: 'Bananes', qty: '1 kg'},
        {idListe: 5, article: 'Pommes de terre', qty: '1 kg'}
        ]
      }
    );
    this.toto.push({
      categorie: 'Papeterie', 
      detail: [
        {idListe: 6, article: 'Crayon HB', qty: '1'}
        ]
      }
    );
    this.toto.push({
      categorie: 'Entretien', 
      detail: [
        {idListe: 7, article: 'Serpillère', qty: '1'}
        ]
      }
    );
    this.toto.push({
      categorie: 'Droguerie', 
      detail: [
        {idListe: 8, article: 'Produit anti-fourmis', qty: '1'}
        ]
      }
    );
    this.toto.push({
      categorie: 'Vrac', 
      detail: [
        {idListe: 9, article: 'Passer à la banque', qty: ''},
        {idListe: 10, article: 'Trouver un cadeau pour Bébert', qty: ''},
        {idListe: 11, article: 'Pile AAA', qty: ''}
        ]
      }
    );
    /*
    this.tabListe=[];
    this.tabListe.push({idListe: 0,  article: 'Steak haché',                    categorie: 'Boucherie',           qty: '250 g'});
    this.tabListe.push({idListe: 1,  article: 'Bifteak',                        categorie: 'Boucherie',           qty: '2'});
    this.tabListe.push({idListe: 2,  article: 'Baguette',                       categorie: 'Boulangerie',         qty: '1'});
    this.tabListe.push({idListe: 3,  article: 'Brioche',                        categorie: 'Boulangerie',         qty: '1'});
    this.tabListe.push({idListe: 4,  article: 'Bananes',                        categorie: 'Fruits et légumes',   qty: '1 kg'});
    this.tabListe.push({idListe: 5,  article: 'Pommes de terre',                categorie: 'Fruits et légumes',   qty: '1 kg'});
    this.tabListe.push({idListe: 6,  article: 'Crayon HB',                      categorie: 'Papeterie',           qty: '1'});
    this.tabListe.push({idListe: 7,  article: 'Serpillère',                     categorie: 'Entretien',           qty: '1'});
    this.tabListe.push({idListe: 8,  article: 'Produit anti-fourmis',           categorie: 'Droguerie',           qty: '1'});
    this.tabListe.push({idListe: 9,  article: 'Passer à la banque',             categorie: 'Vrac',                qty: ''});
    this.tabListe.push({idListe: 10, article: 'Trouver un cadeau pour Bébert',  categorie: 'Vrac',                qty: ''});
    this.tabListe.push({idListe: 11, article: 'Pile AAA',                       categorie: 'Vrac',                qty: ''});
    */
  }


  afficher() {
    console.log("Hello");
  }

  clickDelete() {
    this.message("Item deleted from list");
  }

  clickSpeak() {
    this.message("Listening...");
  }

  clickAdd() {
    //console.log(this.article);
    //this.message(this.article + " added in lists 'items' and 'items to buy'");
  }

  private message(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
