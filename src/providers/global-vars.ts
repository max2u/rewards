import { ConfigResponse } from '../modym/ConfigResponse';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
  env: string;
  client: string;
  apiVersion: string;
  errorMessage: string;
  mobileVersion: string;
  config: ConfigResponse;
  userToken: string;
  uuid: string;

  constructor() {
    this.env = 'local';
    this.client = 'doc';
    this.apiVersion = 'v1';
    this.mobileVersion = '1.0-Alpha';
  }

  public getBgColor() {
    return this.config && this.config.primaryColor ? this.config.primaryColor : '#eee';
  }

  public getLogoImage() {
    return this.config ? this.config.logoImage : '';
  }

  public getBgImage() {
    return this.config ? this.config.backgroundImage : '';
  }
}