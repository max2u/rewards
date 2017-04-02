
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Config } from '../providers/config';
import { Device } from 'ionic-native'

import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';

import { HomePage } from '../pages/home/home';
import { TransactionsPage } from '../pages/transactions/transactions';
import { PurchasesPage } from '../pages/purchases/purchases';
import { AuthService } from '../providers/auth-service';
import { AccountPage } from '../pages/account/account';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoadingPage;

  pages: Array<{ title: string, component: any, icon : string }>;


  constructor(platform: Platform, protected config: Config, protected authService: AuthService) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage , icon: 'home'},
      { title: 'Purchases', component: PurchasesPage , icon: 'cart' },
      { title: 'Transactions', component: TransactionsPage , icon: 'ribbon' },
      { title: 'My Account', component: AccountPage , icon: 'person' }
    ];

    platform.ready().then(() => {
      this.config.uuid = Device.uuid || this.newGuid();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  
  logout(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.authService.logout;
    this.nav.setRoot(LoginPage);
  }

  newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}