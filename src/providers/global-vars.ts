import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GlobalVars {
  env: any;
  client: any;
  apiVersion: any;
  config: any;


  constructor(private http: Http) {
    this.env = 'local';
    this.client = 'doc';
    this.apiVersion = 'v1';
  }
  
  public getConfigObservable(){
    
    let headers = new Headers();
    headers.append('client', 'doc');

    let requestOptions = new RequestOptions(Object.assign({
      method: "GET",
      url: this.getUrl() + '/config?client=' + this.client,
      body: "",
      headers: headers
    }));
    
    
    if (this.config){
      return Observable.of(this.config);
    }
    
    return this._handleSecurityResponse(this.http.get(this.getUrl() + '/config', requestOptions)
      .map((res: Response) => {
        //       this.storageService.setAuthInfo(res.headers); 
        return res.json().result;
      })
      .catch((error: any) => {
        console.debug(error || 'Server error');
        return Observable.throw(error || 'Server error')
      }));
  }


  private _handleSecurityResponse(response: Observable<Response>): Observable<Response> {
    var sharable = response.share();

    sharable.subscribe(data => this.config = data, (error: Response) => {
      return Observable.throw(error || 'Server error')
    });

    return sharable;
  }


  getUrl() {
    if (this.env === 'local') {
      return 'http://' + this.client + '.localhost:8880/modym-portal/api/' + this.apiVersion;
    }
    if (this.env === 'local_em') {
      return 'http://10.0.2.2:8880/modym-portal/api/' + this.apiVersion;
    }
    if (this.env === 'local_mobile') {
      return 'http://10.53.77.117:8880/modym-portal/api/' + this.apiVersion;
    }
    return 'https://' + this.client + '.rewards.modym.com/api/' + this.apiVersion;
  }

  getClient() {
    return this.client;
  }

  getConfig() {
    return this.config;
  }

}