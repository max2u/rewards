import { GlobalVars } from '../../providers/global-vars';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Transactions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected globalVars: GlobalVars) {
    this.selectedItem = navParams.get('item');
    
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is transaction #' + i,
        icon: 'ribbon'
      });
    }
  }
  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TransactionsPage, {
      item: item
    });
  }

}
