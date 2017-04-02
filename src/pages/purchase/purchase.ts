import { PurchaseResponse } from '../../modym/response/PurchaseResponse';
import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';


@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {
  purchase : PurchaseResponse;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    protected globalVars: GlobalVars,
    protected authService: AuthService
  ) { 
  this.purchase = navParams.get('purchase');
  
  }

}
