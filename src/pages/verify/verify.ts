import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GlobalVars } from '../../providers/global-vars';
import { ModymService } from '../../providers/modym-service';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})
export class VerifyPage {
  code: string = '';
  id: string;
  email: string;
  phone: string;

  constructor(private nav: NavController, private navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, protected globalVars: GlobalVars, private modymService: ModymService) {
    this.id = navParams.get('id');
    this.email = navParams.get('email');
    this.phone = navParams.get('phone');
  }

  public verify() {
    this.auth.verify(this.code, this.id).subscribe(response => {
      if (response && response.id ) {
        this.nav.push(RegisterPage, {
            id: response.id,
            email: this.email,
            phone: this.phone
          });
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => { }
        }
      ]
    });
    alert.present();
  }
}