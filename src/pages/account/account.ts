import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(
    public navCtrl: NavController,
    protected globalVars: GlobalVars,
    protected authService: AuthService
  ) { }

}
