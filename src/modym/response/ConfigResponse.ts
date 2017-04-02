
// sync with PortalConfigResponse
export class ConfigResponse {
  public name : string;
  public headLine : string;
  
  public menuLabel: string;

  public logoImage : string;
  public backgroundImage : string;
  
  public textColor : string;
  public backgroundColor : string;

  public emailRequired : boolean;
  public phoneRequired : boolean;
  public phoneVerificationRequired : boolean;

  public facebook : string;
  public instagram : string;
  public twitter : string;
  public youtube : string;

  public privacyPolicy : string;
  public userAgreement : string;
}