import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Config } from '../../providers/config';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(
    public navCtrl: NavController,
    protected config: Config,
    protected authService: AuthService
  ) { }

}
