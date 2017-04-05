import { AuthService } from '../../../providers/AuthService';
import { Config } from '../../../providers/Config';
import { AbstractPage } from '../../AbstractPage';
import { ForgotVerifyPage } from '../forgot-verify/forgot-verify';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage extends AbstractPage {
  phone: '';

  constructor(
    private nav: NavController,
    private authService: AuthService,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    protected config: Config
  ) {
    super(nav, alertCtrl, loadingCtrl)
  }

  public forgot() {
    this.showLoading();
    this.authService.forgot(this.phone).subscribe(response => {
      this.dismissLoading();
      if (response && response.id) {
        this.nav.push(ForgotVerifyPage, {
          id: response.id,
          userId: response.userId,
          phone: this.phone
        });
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.dismissLoading();
        this.showPopup("Error", (error && error.status ? (error.status == 0 ? "unable to process request" : error.statusText) : error));
      });
  }
}