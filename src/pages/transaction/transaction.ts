import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Config } from '../../providers/config';


@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})
export class TransactionPage {
  transaction: PointTransactionResponse;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected config: Config,
    protected authService: AuthService
  ) {
    this.transaction = navParams.get('transaction');
  }

}
