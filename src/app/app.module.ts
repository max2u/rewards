
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { AuthService } from '../providers/AuthService';
import { Config } from '../providers/Config';
import { ModymService } from '../providers/ModymService'

import { SummaryPage } from '../pages/summary/summary';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoadingPage } from '../pages/loading/loading';
import { ErrorPage } from '../pages/error/error';

import { TransactionsPage } from '../pages/transactions/transactions';
import { PurchasesPage } from '../pages/purchases/purchases';
import { AccountPage } from '../pages/account/account';
import { CardsPage } from '../pages/cards/cards';
import { ForgotVerifyPage } from '../pages/forgot/forgot-verify/forgot-verify';
import { ForgotPage } from '../pages/forgot/forgot/forgot';
import { ResetPage } from '../pages/forgot/reset/reset';
import { PreRegisterPage } from '../pages/preregister/preregister';
import { PurchasePage } from '../pages/purchase/purchase';
import { TransactionPage } from '../pages/transaction/transaction';
import { VerifyPage } from '../pages/verify/verify';
import { PageConfig } from '../providers/PageConfig';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1678c281'
  }
};
//

@NgModule({
  declarations: [
    MyApp,
    SummaryPage,
    LoginPage,
    RegisterPage,
    LoadingPage,
    ErrorPage,
    TransactionsPage,
    PurchasesPage,
    AccountPage,
    PurchasePage,
    PreRegisterPage,
    VerifyPage,
    TransactionPage,
    CardsPage,
    ForgotPage,
    ForgotVerifyPage,
    ResetPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SummaryPage,
    LoginPage,
    RegisterPage,
    LoadingPage,
    ErrorPage,
    TransactionsPage,
    PurchasesPage,
    AccountPage,
    PurchasePage,
    PreRegisterPage,
    VerifyPage,
    TransactionPage,
    CardsPage,
    ForgotPage,
    ForgotVerifyPage,
    ResetPage
  ],
  providers: [
    AuthService,
    Config,
    ModymService,
    PageConfig
  ]
})
export class AppModule { }