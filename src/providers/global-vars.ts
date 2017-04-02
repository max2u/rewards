import { ConfigResponse } from '../modym/response/ConfigResponse';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
  env: string;
  client: string;
  apiVersion: string;
  errorMessage: string;
  mobileVersion: number;
  config: ConfigResponse;
  userToken: string;
  uuid: string;

  constructor() {
    this.env = 'prd';
    this.client = 'demo';
    this.apiVersion = 'v1';
    this.mobileVersion = 1.0;
  }

  public getTextColor(){
     return this.config && this.config.textColor ? this.config.textColor : '#000';
  }
  
  public getColor() {
//    var color= this.config ? this.toTemplateColor(this.config.backgroundColor) : 'primary'
    
    return (this.config && this.config.backgroundColor ? this.config.backgroundColor : 'primary');  
  }

  public getLogoImage() {
    return this.config ? this.config.logoImage : '';
  }

  public getBgImage() {
    return this.config ? this.config.backgroundImage : '';
  }
  
  
//  private toTemplateColor(color:string){
//    debugger;
//    if (!color || !color.startsWith('#'))
//      return 'primary';
//    
//    if(color.length == 4){
//      return "c" + this.nearist(color.substr(1,1)) + this.nearist(color.substr(2,1)) + this.nearist(color.substr(3,1));
//    }
//    
//    if(color.length == 7){
//      return "c" + this.nearist(color.substr(1, 1)) + this.nearist(color.substr(3, 1)) + this.nearist(color.substr(5, 1));
//    }
//    return 'primary';
//  }
  
  private nearist(n){
    return Math.round(n/3.0) * 3
  }
}