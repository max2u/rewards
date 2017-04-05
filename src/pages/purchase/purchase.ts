import { PurchaseResponse } from '../../modym/response/PurchaseResponse';
import { AuthService } from '../../providers/AuthService';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Config } from '../../providers/Config';
import { AbstractPage } from '../AbstractPage';


@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage extends AbstractPage{
  item : PurchaseResponse;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    protected config: Config,
    protected authService: AuthService
  ) { 
    super(navCtrl, alertCtrl, loadingCtrl)
  this.item = navParams.get('purchase');
  
  }
  
  imageTapped(image){
    this.showPopup("image", "<img src='" + image + "' />" );
  }

}
