import { UserRegisterRequest } from '../../modym/request/UserRegisterRequest';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GlobalVars } from '../../providers/global-vars';
import { ModymService } from '../../providers/modym-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials: UserRegisterRequest;

  constructor(private nav: NavController, private navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, protected globalVars: GlobalVars, private modymService: ModymService) {
    this.registerCredentials = new UserRegisterRequest();
    this.registerCredentials.id = navParams.get("id");
    this.registerCredentials.email = navParams.get("email");
    this.registerCredentials.phone = navParams.get("phone");
    this.registerCredentials.gender = "UNSPECIFIED";
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(response => {
        if (!response) {
          this.showPopup("Error", "Problem creating account.");
        } else if (typeof response !== 'string'){
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", response);
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
          handler: data => {
            if (this.createSuccess) {
              this.nav.setRoot(LoginPage, {
                username: this.registerCredentials.email,
                password: this.registerCredentials.password
              });
            }
          }
        }
      ]
    });
    alert.present();
  }
}