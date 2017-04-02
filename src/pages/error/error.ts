import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';
/*
  Generated class for the Error page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-error',
  templateUrl: 'error.html'
})
export class ErrorPage {
  
  error : string;
  errorCode : number;

  constructor(public navCtrl: NavController, public navParams: NavParams,protected globalVars: GlobalVars) {
    this.error = navParams.get('error');
    this.errorCode = navParams.get('errorCode');
  }
  
  
  notOldVersion() : boolean {
    return !this.errorCode || this.errorCode != 153;
  }
  
  oldVersion() : boolean {
    return this.errorCode && this.errorCode == 153;
  }
}
