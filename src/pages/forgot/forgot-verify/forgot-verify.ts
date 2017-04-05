import { AuthService } from '../../../providers/AuthService';
import { Config } from '../../../providers/Config';
import { AbstractPage } from '../../AbstractPage';
import { ResetPage } from '../reset/reset';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-forgot-verify',
  templateUrl: 'forgot-verify.html'
})
export class ForgotVerifyPage extends AbstractPage{
  code: string = '';
  id: string;
  userId: string;
  phone: string;

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

  public verify() {
    this.showLoading();
    this.authService.verify(this.code, this.id).subscribe(response => {
      this.dismissLoading();
      if (response && response.id ) {
        this.nav.push(ResetPage, {
            id: response.id,
            userId: this.userId,
            phone: this.phone
          });
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.dismissLoading();
        this.showPopup("Error", error);
      });
  }
}