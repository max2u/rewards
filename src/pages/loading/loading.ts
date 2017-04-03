import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModymService } from '../../providers/ModymService';
import { Config } from '../../providers/Config';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {
  constructor(public navCtrl: NavController, public modymService: ModymService, protected config: Config) {
    //when getting the config done, redirect to the login page
    this.modymService.getConfig(this.navCtrl).subscribe(data => this.navCtrl.setRoot(LoginPage));
  }
}
