import { GlobalVars } from '../../providers/global-vars';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Purchases page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html'
})
export class PurchasesPage {

  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected globalVars: GlobalVars) {
    this.selectedItem = navParams.get('item');
    
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is purchase #' + i,
        icon: 'cart'
      });
    }
  }
  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(PurchasesPage, {
      item: item
    });
  }


}
