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
    this.env = 'local';
    this.client = 'doc';
    this.apiVersion = 'v1';
    this.mobileVersion = 1.0;
  }

  public getTextColor(){
     return this.config && this.config.textColor ? this.config.textColor : '#000';
  }
  
  public getColor() {
    return (this.config && this.config.backgroundColor ? this.config.backgroundColor : 'primary');  
  }

  public getLogoImage() {
    return this.config ? this.config.logoImage : '';
  }

  public getBgImage() {
    return this.config ? this.config.backgroundImage : '';
  }
}