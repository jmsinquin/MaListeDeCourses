import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html'
})
export class CategoriePage {
  items: Array<string>;
  tabCat: Array<{idCat: number, categorie: string}>;
  selectedItem: any;
  filterContain: string;

  ngOnInit() {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    
    this.filterContain="";
    this.setCategories();
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

  filterCategories(ev: any) {
    this.setCategories();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.tabCat = this.tabCat.filter(
        function(item) {
          return item.categorie.toLowerCase().includes(val.toLowerCase()); 
        }
      );
    }
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
            //console.log(data.tboxCategorie);
            console.log("Catégorie " + data.tboxCategorie + " ajoutée");
          }
        }
      ]
    });
    alert.present();
    //console.log("Catégorie ajoutée");
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
            console.log("Catégorie " + item.categorie + " supprimée (id=" + item.idCat + ")");
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
            if (data.tboxCategorie != '') {
              console.log(data.tboxCategorie);
              console.log("Catégorie " + item.categorie + " modifiée (id=" + item.idCat + ")");
            }             
          }
        }
      ]
    });
    alert.present();
    
  }

  itemTapped(event, item) {
    console.clear();
    // Affiche l'id de la sélection
    console.log("id : " + item.idCat);
    // Affiche la catégorie de la sélection
    console.log("Catégorie : " + item.categorie);
    // Affiche le nombre d'éléments dans la liste
    console.log("Nbre d'éléments : " + this.tabCat.length);
    // Affiche le filtre
    console.log("Filtre : " + this.filterContain);

  }


}