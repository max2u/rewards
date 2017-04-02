import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Config } from '../../providers/config';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    protected config: Config,
    protected authService: AuthService
  ) { }

}
