import { PurchaseResponse } from '../../modym/response/PurchaseResponse';
import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Config } from '../../providers/config';


@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {
  purchase : PurchaseResponse;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    protected config: Config,
    protected authService: AuthService
  ) { 
  this.purchase = navParams.get('purchase');
  
  }

}
