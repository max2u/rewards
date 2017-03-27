import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LoadingPage } from '../pages/loading/loading';
 
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoadingPage;
  constructor( platform: Platform) {
    platform.ready().then(() => {
    });
  }
}