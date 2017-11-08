import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  article: string;
  qty: string;
  items: Array<{title: string, note: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController) {

    this.items = [];
    
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Article ' + i,
        note: 'Qté : ' + i
      });
    }
  }

  itemTapped1(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HomePage, {
      item: item
    });
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
    console.log(this.article);
    this.message(this.article + " added in lists 'items' and 'items to buy'");
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
