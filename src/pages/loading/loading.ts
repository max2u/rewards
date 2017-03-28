import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModymService } from '../../providers/modym-service';
import { GlobalVars } from '../../providers/global-vars';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {
  constructor(public navCtrl: NavController, public modymService: ModymService, protected globalVars: GlobalVars) {
    //when getting the config done, redirect to the login page
    this.modymService.getConfig(this.navCtrl).subscribe(data => this.navCtrl.push(LoginPage));
  }
}
