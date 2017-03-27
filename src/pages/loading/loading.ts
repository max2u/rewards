import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';
import { LoginPage } from '../login/login';
import { ErrorPage } from '../error/error';

/*
  Generated class for the Loading page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVars) {
    this.globalVars.getConfigObservable().subscribe(data => this.toLoginPage(), error => this.toErrorPage() );
    
  }

  toLoginPage(){
    this.navCtrl.push(LoginPage);
  }
  
  toErrorPage(){
    this.navCtrl.push(ErrorPage);
  }

}
