
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Config } from '../providers/Config';
import { Device } from 'ionic-native'

import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { PageConfig } from '../providers/PageConfig';

import { AuthService } from '../providers/AuthService';
import { ModymService } from '../providers/ModymService';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoadingPage;

  constructor(
    platform: Platform,
    protected config: Config,
    protected authService: AuthService,
    protected modymService: ModymService,
    protected pageConfig: PageConfig
  ) {
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