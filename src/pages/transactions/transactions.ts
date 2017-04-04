import { PageResponse } from '../../modym/response/PageRespponse';
import { Config } from '../../providers/Config';
import { ModymService } from '../../providers/ModymService';
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
  itemPage: PageResponse<PointTransactionResponse>;
  selectedItemId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    protected config: Config,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modymService: ModymService) {
    
    if(navParams.get("itemPage")){
      this.itemPage= navParams.get("itemPage");
    }else{
      var page = navParams.get("page") || 0;
      this.showLoading();
  
      this.modymService.getTransactionPage(page, 10)
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


  itemTapped(event, item:PointTransactionResponse) {
    this.selectedItemId= item.transactionId;
//      selectedItem: item,
//        itemPage: this.itemPage
//    });

    
  }

  hasPrevious(): boolean {
    return this.itemPage && this.itemPage.page > 0;
  }

  hasNext(): boolean {
    return this.itemPage && this.itemPage.page < this.itemPage.totalPages - 1;
  }

  prevPage() {
    this.navCtrl.setRoot(TransactionsPage, {
      page: this.itemPage.page > 0 ? this.itemPage.page -1 :  0
    });
  }
  
  nextPage() {
    this.navCtrl.setRoot(TransactionsPage, {
      page: this.itemPage && this.itemPage.page < (this.itemPage.totalPages -1) ? this.itemPage.page + 1 :  0
    });
  }

  

}
