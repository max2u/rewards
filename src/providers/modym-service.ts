import { ConfigResponse } from '../modym/ConfigResponse';
import { UserAuthenticationResponse } from '../modym/UserAuthenticationResponse';
import { UserAuthenticationRequest } from '../modym/request/UserAuthenticationRequest';
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
        navCtrl.setRoot(ErrorPage);
        return Observable.of();
      })), navCtrl);
  }


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



  /* ========================================================================
   * PRIVATE METHODS
   * ========================================================================*/

  private getRequestOptions() {
    let headers = new Headers();
    headers.append('Client', this.globalVars.client);
    headers.append('Version', this.globalVars.mobileVersion);
    if (this.globalVars.userToken)
      headers.append('Auth-Token', this.globalVars.userToken);


    return new RequestOptions(Object.assign({
      headers: headers
    }));
  }

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