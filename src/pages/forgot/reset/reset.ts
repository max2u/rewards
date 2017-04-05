import { AuthService } from '../../../providers/AuthService';
import { Config } from '../../../providers/Config';
import { AbstractPage } from '../../AbstractPage';
import { LoginPage } from '../../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html'
})
export class ResetPage extends AbstractPage {
  createSuccess = false;
  id: string;
  userId: string;
  phone: string;
  newPassword: string;

  newPasswordConfirm: string;

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private authService: AuthService,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    protected config: Config
  ) {
    super(nav, alertCtrl, loadingCtrl);

    this.id = navParams.get('id');
    this.userId = navParams.get('userId');
    this.phone = navParams.get('phone');
  }

  public reset() {
    this.showLoading();
    this.authService.reset(this.id, this.userId, this.newPassword, this.phone).subscribe(response => {
      this.dismissLoading();
      if ( response && response.email) {
        this.showPopupAndRedirect("Password Changed", "Password reset successfully", LoginPage, {
          email: response.email,
          password: this.newPassword
        });
      } else {
        this.showPopup("Error", "resetting password failed: " + response);
      }
    },
      error => {
        this.dismissLoading();
        this.showPopup("Error", (error && error.status ? (error.status == 0 ? "unable to process request" : error.statusText) : error));
      });
  }
}