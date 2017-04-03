import { AuthService } from '../../providers/auth-service';
import { Config } from '../../providers/config';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Purchases page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {

  constructor(public navCtrl: NavController,
    protected config: Config,
    protected authService: AuthService) {

  }
}
