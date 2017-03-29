import { UserAuthenticationResponse } from '../modym/UserAuthenticationResponse';
import { UserAuthenticationRequest } from '../modym/request/UserAuthenticationRequest';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModymService } from './modym-service';
import 'rxjs/add/operator/catch';



@Injectable()
export class AuthService {
  currentUser: UserAuthenticationResponse;

  constructor(private modymService: ModymService) { }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      
      var response = this.modymService.postAuthenticate(new UserAuthenticationRequest(credentials.email, credentials.password, this.modymService.globalVars.uuid));

      var sharable = response.share();
      sharable.subscribe(
        (user: UserAuthenticationResponse) => {
          this.currentUser = user;
          this.modymService.globalVars.userToken= user.token;
        });
      return response;
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): UserAuthenticationResponse {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}