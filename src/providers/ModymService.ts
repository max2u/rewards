import { UserAuthenticationRequest } from '../modym/request/UserAuthenticationRequest';
import { UserDetailsUpdateRequest } from '../modym/request/UserDetailsUpdateRequest';
import { UserPreRegisterRequest } from '../modym/request/UserPreRegisterRequest';
import { UserRegisterRequest } from '../modym/request/UserRegisterRequest';
import { UserVerificationRequest } from '../modym/request/UserVerificationRequest';
import { AuthorizationCodeResponse } from '../modym/response/AuthorizationCodeResponse';
import { ConfigResponse } from '../modym/response/ConfigResponse';
import { PageResponse } from '../modym/response/PageRespponse';
import { PurchaseResponse } from '../modym/response/PurchaseResponse';
import { UserAuthenticationResponse } from '../modym/response/UserAuthenticationResponse';
import { UserDetailsResponse } from '../modym/response/UserDetailsResponse';
import { UserForgotPasswordResponse } from '../modym/response/UserForgotPasswordResponse';
import { UserPasswordResetResponse } from '../modym/response/UserPasswordResetResponse';
import { UserPreRegisterResponse } from '../modym/response/UserPreRegisterResponse';
import { UserVerificationResponse } from '../modym/response/UserVerificationResponse';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Config } from './Config';
import { NavController } from "ionic-angular/index";
import { ErrorPage } from '../pages/error/error';
import 'rxjs/add/operator/catch';



@Injectable()
export class ModymService {


  constructor(private http: Http, public config: Config) { }

  /** 
   * Request headers 
   */
  private getRequestOptions() {
    let headers = new Headers();
    headers.append('Client', this.config.client);
    headers.append('Version', this.config.mobileVersion.toString());
    headers.append('Medium', 'Mobile');

    if (this.config.userToken)
      headers.append('Auth-Token', this.config.userToken);


    return new RequestOptions(Object.assign({
      headers: headers
    }));
  }


  /**
   * get app global config from server
   */
  public getConfig(navCtrl: NavController): Observable<ConfigResponse> {

    if (this.config.config) {
      return this.wrapResponse(Observable.of(this.config.config), navCtrl);
    }


    return this.wrapResponse(this.wrapConfigResponse(this.http.get(this.getUrl() + '/session/config', this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((error: any) => {
        console.debug('Server error' + (error.json() && error.json().error ? ' : ' + error.json().error : ''));
        this.config.errorMessage = error.json() && error.json().error ? ' : ' + error.json().error : '';

        navCtrl.setRoot(ErrorPage, {
          error: error.json() && error.json().error ? error.json().error : 'Server Error',
          errorCode: error.json() && error.json().errorCode
        });
        return Observable.of();
      })), navCtrl);
  }

  public getPurchasePage(page: number, pageSize: number): Observable<PageResponse<PurchaseResponse>> {
    return this.get('/user/purchases?page=' + (page ? page : 0) + '&size=' + (pageSize ? pageSize : 10));
  }


  public getTransactionPage(page: number, pageSize: number): Observable<PageResponse<PointTransactionResponse>> {
    return this.get('/user/transactions?page=' + (page ? page : 0) + '&size=' + (pageSize ? pageSize : 10));
  }


  public generateVerificationCode(): Observable<AuthorizationCodeResponse> {
    return this.post(null, '/user/verification-code');
  }


  public updateUser(userDetails: UserDetailsUpdateRequest): Observable<UserDetailsResponse> {
    return this.post(userDetails, '/user/update');
  }


  // ==================================================================================================================
  // AUTHENTICATION & REGISTRATION 
  // ==================================================================================================================

  /**
   * authenticate user
   */
  public postAuthenticate(request: UserAuthenticationRequest): Observable<UserAuthenticationResponse> {
    return this.post(request, '/session/authenticate');
  }

  /**
   * pre-register request
   */
  public postPreregister(request: UserPreRegisterRequest): Observable<UserPreRegisterResponse> {
    return this.post(request, '/session/pre-register');
  }


  /**
   * verify request
   */
  public postVerify(request: UserVerificationRequest): Observable<UserVerificationResponse> {
    return this.post(request, '/session/verify');
  }

  /**
  * registration complete request
  */
  public postRegister(request: UserRegisterRequest): Observable<any> {
    return this.post(request, '/session/register');
  }

  /**
  * forgot password request
  */
  public postForgot(phone, email): Observable<UserForgotPasswordResponse>{
    return this.post({ "phone": phone, "email": email, 'deviceId' : this.config.uuid }, '/session/forgot');
  }

  /**
  * reset password request
  */
  public postReset(id, userId, password, phone): Observable<UserPasswordResetResponse> {
    return this.post({ "id": id, "userId": userId, "password": password, 'phone': phone, 'deviceId' : this.config.uuid }, '/session/reset');
  }

  
  // ==================================================================================================================
  // PRIVATE METHODS
  // ==================================================================================================================


  private get(path: string): Observable<any> {
    return this.http.get(this.getUrl() + path, this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status == 404 || res.status == 0 ? 'Unable to complete request.' : (res.json() && res.json().error ? res.json().error : res));
        return Observable.throw(error);
      });

  }

  private post(body: any, path: string): Observable<any> {
    return this.http.post(this.getUrl() + path, body, this.getRequestOptions())
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((res: any) => {
        var error = (res.status == 404 || res.status == 0  ? 'Unable to complete request.' : (res.json() && res.json().error ? res.json().error : res));
        return Observable.throw(error);
      });

  }

  private wrapConfigResponse(response: Observable<ConfigResponse>): Observable<ConfigResponse> {
    var sharable = response.share();
    sharable.subscribe(
      (data: ConfigResponse) => {
        this.config.config = data;
      });
    return sharable;
  }


  private wrapResponse(response: Observable<any>, navCtrl: NavController): Observable<any> {
    var sharable = response.share();
    sharable.subscribe(null, (error: Response) => {
      this.config.errorMessage = error.json() && error.json().error ? ' : ' + error.json().error : '';
      navCtrl.push(ErrorPage);
    });
    return sharable;
  }

  private getUrl() {
    if (this.config.env === 'local') {
      return 'http://' + this.config.client + '.localhost:8880/modym-portal/api/' + this.config.apiVersion;
    }
    if (this.config.env === 'local_em') {
      return 'http://10.0.2.2:8880/modym-portal/api/' + this.config.apiVersion;
    }
    if (this.config.env === 'local_mobile') {
      return 'http://10.53.77.117:8880/modym-portal/api/' + this.config.apiVersion;
    }
    return 'https://' + this.config.client + '.rewards.modym.com/api/' + this.config.apiVersion;
  }
}