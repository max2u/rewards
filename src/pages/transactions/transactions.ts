import { PageResponse } from '../../modym/response/PageRespponse';
import { GlobalVars } from '../../providers/global-vars';
import { ModymService } from '../../providers/modym-service';
import { TransactionPage } from '../transaction/transaction';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';

/*
  Generated class for the Transactions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  loading: Loading;
  selectedItem: any;

  page: number = 0;
  pageSize: number = 10;

  itemPage: PageResponse<PointTransactionResponse>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    protected globalVars: GlobalVars,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modymService: ModymService) {
    this.page = navParams.get("page") || this.page;
    this.pageSize = navParams.get("pageSize") || this.pageSize;
    this.showLoading();

    this.modymService.getTransactionPage(this.page, this.pageSize)
      .catch((error: any) => {
        this.loading.dismiss();
        return Observable.of(error);
      })
      .subscribe((resp: PageResponse<PointTransactionResponse>) => {
        this.loading.dismiss();
        if (resp) {
          this.itemPage = resp;
        } else {
          this.showError(resp);
        }
      },
      error => {
        this.loading.dismiss();
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


  itemTapped(event, item) {
    this.navCtrl.push(TransactionPage, {
      transaction: item
    });
  }

  hasPrevious(): boolean {
    return this.itemPage && this.itemPage.page > 0;
  }

  hasNext(): boolean {
    return this.itemPage && this.itemPage.page < this.itemPage.totalPages - 1;
  }

  prevPage() {
    this.navCtrl.setRoot(TransactionsPage, {
      page: this.page > 0 ? this.page -1 :  0,
      pageSize: this.pageSize
    });
  }
  
  nextPage() {
    this.navCtrl.setRoot(TransactionsPage, {
      page: this.itemPage && this.itemPage.page < (this.itemPage.totalPages -1) ? this.itemPage.page + 1 :  0,
      pageSize: this.pageSize
    });
  }

  

}
