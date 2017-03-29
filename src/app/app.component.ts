import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LoadingPage } from '../pages/loading/loading';
import { GlobalVars } from '../providers/global-vars';
import {Device} from 'ionic-native'
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoadingPage;
  
  constructor( platform: Platform, protected globalVars: GlobalVars) {
    platform.ready().then(() => {
      this.globalVars.uuid = Device.uuid || this.newGuid();
    });
  }
  
  
  newGuid() : string{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}