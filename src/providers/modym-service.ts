import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GlobalVars, ConfigResponse } from './global-vars';
import { NavController } from "ionic-angular/index";
import { ErrorPage } from '../pages/error/error';


@Injectable()
export class ModymService {

  constructor(private http: Http, private globalVars: GlobalVars) { }


  public getConfig(navCtrl: NavController) {
    let headers = new Headers();
    headers.append('Client', this.globalVars.client);

    let requestOptions = new RequestOptions(Object.assign({
      method: "GET",
      url: this.getUrl() + '/config?client=' + this.globalVars.client,
      body: "",
      headers: headers
    }));

    if (this.globalVars.config) {
      return this.wrapResponse(Observable.of(this.globalVars.config), navCtrl);
    }

    return this.wrapResponse(this.wrapConfigResponse(this.http.get(this.getUrl() + '/config', requestOptions)
      .map((res: Response) => {
        return res.json().result;
      })
      .catch((error: any) => {
        console.debug('Server error' + (error.json() && error.json().error ? ' : ' + error.json().error : ''));
        this.globalVars.errorMessage = error.json() && error.json().error ? ' : ' + error.json().error : '';
        navCtrl.push(ErrorPage);
        return Observable.of();
      })), navCtrl);
  }

  /* ========================================================================
   * PRIVATE METHODS
   * ========================================================================*/
  private wrapConfigResponse(response: Observable<ConfigResponse>): Observable<ConfigResponse> {
    var sharable = response.share();
    sharable.subscribe(
      (data: ConfigResponse) =>{ 
        this.globalVars.config = data;
    });
    return sharable;
  }


  private wrapResponse(response: Observable<any>, navCtrl: NavController): Observable<Response> {
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