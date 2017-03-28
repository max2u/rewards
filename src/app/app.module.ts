
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { AuthService } from '../providers/auth-service';
import { GlobalVars } from '../providers/global-vars';
import { ModymService } from '../providers/modym-service'

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoadingPage } from '../pages/loading/loading';
import { ErrorPage } from '../pages/error/error';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoadingPage,
    ErrorPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoadingPage,
    ErrorPage
  ],
  providers: [
    AuthService,
    GlobalVars,
    ModymService
  ]
})
export class AppModule { }