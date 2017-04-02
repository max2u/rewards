import { UserAuthenticationRequest } from '../modym/request/UserAuthenticationRequest';
import { UserPreRegisterRequest } from '../modym/request/UserPreRegisterRequest';
import { UserRegisterRequest } from '../modym/request/UserRegisterRequest';
import { UserVerificationRequest } from '../modym/request/UserVerificationRequest';
import { ConfigResponse } from '../modym/response/ConfigResponse';
import { PageResponse } from '../modym/response/PageRespponse';
import { PurchaseResponse } from '../modym/response/PurchaseResponse';
import { UserAuthenticationResponse } from '../modym/response/UserAuthenticationResponse';
import { UserPreRegisterResponse } from '../modym/response/UserPreRegisterResponse';
import { UserVerificationResponse } from '../modym/response/UserVerificationResponse';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GlobalVars } from './global-vars';
import { NavController } from "ionic-angular/index";
import { ErrorPage } from '../pages/error/error';
import 'rxjs/add/operator/catch';



@Injectable()
export class ModymService {


  constructor(private http: Http, public globalVars: GlobalVars) { }

  /** 
   * Request headers 
   */
  private getRequestOptions() {
    let headers = new Headers();
    headers.append('Client', this.globalVars.client);
    headers.append('Version', this.globalVars.mobileVersion.toString());
    headers.append('Medium', 'Mobile');

    if (this.globalVars.userToken)
      headers.append('Auth-Token', this.globalVars.userToken);


    return new RequestOptions(Object.assign({
      headers: headers
    }));
  }


  /**
   * get app global config from server
   */
  public getConfig(navCtrl: NavController): Observable<ConfigResponse> {

    if (this.globalVars.config) {
      return this.wrapResponse(Observable.of(this.globalVars.config), navCtrl);
    }

    return this.wrapResponse(this.wrapConfigResponse(this.http.get(this.getUrl() + '/config', this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((error: any) => {
        console.debug('Server error' + (error.json() && error.json().error ? ' : ' + error.json().error : ''));
        this.globalVars.errorMessage = error.json() && error.json().error ? ' : ' + error.json().error : '';

        navCtrl.setRoot(ErrorPage, {
          error: error.json() && error.json().error ? error.json().error : 'Server Error',
          errorCode: error.json() && error.json().errorCode
        });
        return Observable.of();
      })), navCtrl);
  }

  public getPurchasePage(page : number, pageSize: number) : Observable<PageResponse<PurchaseResponse>> {
    return this.http.get(this.getUrl() + '/user/purchases?page='+(page ? page : 0) + '&size=' +(pageSize ? pageSize : 10) , this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status != 401 ? 'Request has failed : ' : '') + (res.json() && res.json().error ? res.json().error : res);
        return Observable.throw(error);
      });
  }


  public getTransactionPage(page : number, pageSize: number) : Observable<PageResponse<PointTransactionResponse>> {
    return this.http.get(this.getUrl() + '/user/transactions?page='+(page ? page : 0) + '&size=' +(pageSize ? pageSize : 10) , this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status != 401 ? 'Request has failed : ' : '') + (res.json() && res.json().error ? res.json().error : res);
        return Observable.throw(error);
      });
  }





  // ==================================================================================================================
  // AUTHENTICATION & REGISTRATION 
  // ==================================================================================================================

  /**
   * authenticate user
   */
  public postAuthenticate(request: UserAuthenticationRequest): Observable<UserAuthenticationResponse> {
    return this.http.post(this.getUrl() + '/authenticate', request, this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status != 401 ? 'Request has failed : ' : '') + (res.json() && res.json().error ? res.json().error : res);
        return Observable.throw(error);
      });
  }

  /**
   * pre-register request
   */
  public postPreregister(request: UserPreRegisterRequest): Observable<UserPreRegisterResponse> {
    return this.http.post(this.getUrl() + '/pre-register', request, this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status == 404 ? 'Unable to get complete request.' : (res.json() && res.json().error ? res.json().error : res));
        return Observable.throw(error);
      });
  }
  
  
  /**
   * verify request
   */
  public postVerify(request: UserVerificationRequest): Observable<UserVerificationResponse> {
    return this.http.post(this.getUrl() + '/verify', request, this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status == 404 ? 'Unable to get complete request.' : (res.json() && res.json().error ? res.json().error : res));
        return Observable.throw(error);
      });
  }
  
  
   /**
   * registration complete request
   */
  public postRegister(request: UserRegisterRequest): Observable<any> {
    return this.http.post(this.getUrl() + '/register', request, this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status == 404 ? 'Unable to get complete request.' : (res.json() && res.json().error ? res.json().error : res));
        return Observable.throw(error);
      });
  }




  // ==================================================================================================================
  // PRIVATE METHODS
  // ==================================================================================================================

  private wrapConfigResponse(response: Observable<ConfigResponse>): Observable<ConfigResponse> {
    var sharable = response.share();
    sharable.subscribe(
      (data: ConfigResponse) => {
        this.globalVars.config = data;
      });
    return sharable;
  }


  private wrapResponse(response: Observable<any>, navCtrl: NavController): Observable<any> {
    var sharable = response.share();
    sharable.subscribe(null, (error: Response) => {
      this.globalVars.errorMessage = error.json() && error.json().error ? ' : ' + error.json().error : '';
      navCtrl.push(ErrorPage);
    });
    return sharable;
  }

  private getUrl() {
    if (this.globalVars.env === 'local') {
      return 'http://' + this.globalVars.client + '.localhost:8880/modym-portal/api/' + this.globalVars.apiVersion;
    }
    if (this.globalVars.env === 'local_em') {
      return 'http://10.0.2.2:8880/modym-portal/api/' + this.globalVars.apiVersion;
    }
    if (this.globalVars.env === 'local_mobile') {
      return 'http://10.53.77.117:8880/modym-portal/api/' + this.globalVars.apiVersion;
    }
    return 'https://' + this.globalVars.client + '.rewards.modym.com/api/' + this.globalVars.apiVersion;
  }
}