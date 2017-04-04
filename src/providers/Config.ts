import { ConfigResponse } from '../modym/response/ConfigResponse';
import { Injectable } from '@angular/core';

@Injectable()
export class Config {
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
    this.client = 'lemon';
    this.apiVersion = 'v1';
    this.mobileVersion = 1.0;
  }

  public getTextColor(){
     return this.config && this.config.textColor ? this.config.textColor : '#000';
  }
  
  public getColor() {
    return (this.config && this.config.backgroundColor ? this.config.backgroundColor : 'primary');  
  }

  public getButtonColor() {
    return (this.config && this.config.buttonColor ? this.config.buttonColor : 'primary');  
  }
  
  public getLogoImage() {
    return this.config ? this.config.logoImage : '';
  }

  public getBgImage() {
    return this.config ? this.config.backgroundImage : '';
  }
  
  
  public getLoyaltyTextColot() {
    return (this.config && this.config.loyaltyTextColor ? this.config.loyaltyTextColor : '#000'); 
  }
  
  public showPurchaseId(): boolean{
    return this.config.showPurchaseId;
  }
  
  public showPurchaseItems(): boolean{
    return this.config.showPurchaseItems;
  }
  
  public showPurchaseSource(): boolean{
    return this.config.showPurchaseSource;
  }
  
  
  
}