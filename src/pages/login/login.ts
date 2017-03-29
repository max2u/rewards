import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { GlobalVars } from '../../providers/global-vars';
import { ModymService } from '../../providers/modym-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    protected globalVars: GlobalVars,
    protected modymService: ModymService,
  ) { }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()

    this.auth.login(this.registerCredentials)
      .catch((error: any) => {
        return Observable.of(error);
      })
      .subscribe(resp => {
        debugger;
        if (resp && resp.token) {
          debugger;
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(HomePage)
          });
        } else {
          var message= typeof resp === 'string' ?  resp : "Access Denied";
          this.showError(message);
        }
      },
      error => {
        debugger;
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}