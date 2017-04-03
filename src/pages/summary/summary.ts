import { AuthService } from '../../providers/AuthService';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Config } from '../../providers/Config';
import { ModymService } from '../../providers/ModymService';


@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  loading: Loading;
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    protected config: Config,
    protected authService: AuthService,
    protected modymService: ModymService
  ) { }

  generateVerificationCode() {
    this.showLoading();
    this.modymService.generateVerificationCode().subscribe(result => {
      this.loading.dismiss();
      this.showPopup("Done", "new verifcation code : <b>" + result.code +"</b>");
    }, error => {
      this.loading.dismiss();
      this.showPopup("Error", error);
    });
  }
  
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  
  
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    alert.present();
  }
  
}
