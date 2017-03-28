import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
  env: any;
  client: any;
  apiVersion: any;
  errorMessage: any;
  config: ConfigResponse;


  constructor() {
    this.env = 'local';
    this.client = 'doc';
    this.apiVersion = 'v1';
  }

  public getBgColor() {
    return this.config && this.config.primaryColor ?  this.config.primaryColor : '#eee';
  }
  
  public getLogoImage() {
    return this.config ? this.config.logoImage : '';
  }
  
  public getBgImage() {
    return this.config ? this.config.backgroundImage : '';
  }
}


// sync with PortalConfigResponse
export class ConfigResponse {
  public name : any;
  public headLine : any;

  public primaryColor : any;
  public logoImage : any;
  public backgroundImage : any;

  public emailRequired : any;
  public phoneRequired : any;
  public phoneVerificationRequired : any;

  public facebook : any;
  public instagram : any;
  public twitter : any;
  public youtube : any;

  public privacyPolicy : any;
  public userAgreement : any;
}