import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LoadingPage } from '../pages/loading/loading';
import { GlobalVars } from '../providers/global-vars';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoadingPage;
  
  constructor( platform: Platform, protected globalVars: GlobalVars) {
    platform.ready().then(() => {
    });
  }
  
}