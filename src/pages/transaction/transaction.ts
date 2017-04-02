import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';


@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})
export class TransactionPage {
  transaction: PointTransactionResponse;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected globalVars: GlobalVars,
    protected authService: AuthService
  ) {
    this.transaction = navParams.get('transaction');
  }

}
