import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/AuthService';
import { Config } from '../../providers/Config';
import { ModymService } from '../../providers/ModymService';
import { RegisterPage } from '../register/register';
import { VerifyPage } from '../verify/verify';

@Component({
  selector: 'page-preregister',
  templateUrl: 'preregister.html'
})
export class PreRegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', phone: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, protected config: Config, private modymService: ModymService) { }

  public register() {
    this.auth.preregister(this.registerCredentials).subscribe(response => {
      
      if (response && response.id ) {
        if(response.smsVerificationRequired){
          this.nav.push(VerifyPage, {
            id: response.id,
            email: this.registerCredentials.email,
            phone: this.registerCredentials.phone
          });
        }else{
          this.nav.push(RegisterPage, {
            id: response.id,
            email: this.registerCredentials.email,
            phone: this.registerCredentials.phone
          });
        }
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", (error && error.status ? (error.status == 0 ? "unable to process request" : error.statusText): error));
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}