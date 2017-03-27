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

  constructor(public navCtrl: NavController, public navParams: NavParams,protected globalVars: GlobalVars) {
  }

}
