import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {ViewChild} from 'angular2/core';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingPage } from '../pages/loading/loading';
import { NavController } from 'ionic-angular';
 
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoadingPage;
  constructor( platform: Platform) {
    
   
    platform.ready().then(() => {
      //StatusBar.styleDefault();
//	    splashScreen.hide();
      // loading.dismiss();
      
    });
  }
}