import { UserAuthenticationRequest } from '../modym/request/UserAuthenticationRequest';
import { UserPreRegisterRequest } from '../modym/request/UserPreRegisterRequest';
import { UserVerificationRequest } from '../modym/request/UserVerificationRequest';
import { UserRegisterRequest } from '../modym/request/UserRegisterRequest';
import { UserAuthenticationResponse } from '../modym/response/UserAuthenticationResponse';
import { UserPreRegisterResponse } from '../modym/response/UserPreRegisterResponse';
import { UserVerificationResponse } from '../modym/response/UserVerificationResponse';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModymService } from './ModymService';
import 'rxjs/add/operator/catch';



@Injectable()
export class AuthService {
  currentUser: UserAuthenticationResponse;

  constructor(private modymService: ModymService) { }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.modymService.postAuthenticate(new UserAuthenticationRequest(credentials.email, credentials.password, this.modymService.config.uuid));
    }
  }

  public preregister(preregister): Observable<UserPreRegisterResponse> {
    if (!preregister.email || !preregister.phone) {
      return Observable.throw("Please insert email and phone");
    } else {
      // At this point store the credentials to your backend!
      return this.modymService.postPreregister(new UserPreRegisterRequest(preregister.email, preregister.phone, this.modymService.config.uuid));
    }
  }

  public verify(code: string, id: string): Observable<UserVerificationResponse> {
    if (!code) {
      return Observable.throw("Please insert verification code");
    } else if (!id) {
      return Observable.throw("Invalid verification identifier");
    } else {
      return this.modymService.postVerify(new UserVerificationRequest(code,id, this.modymService.config.uuid));
    }
  }
  public register(credentials: UserRegisterRequest) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.modymService.postRegister(credentials);
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