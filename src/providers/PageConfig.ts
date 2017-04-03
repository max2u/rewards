import { UserAuthenticationResponse } from '../modym/response/UserAuthenticationResponse';
import { AccountPage } from '../pages/account/account';
import { CardsPage } from '../pages/cards/cards';
import { SummaryPage } from '../pages/summary/summary';
import { PurchasesPage } from '../pages/purchases/purchases';
import { TransactionsPage } from '../pages/transactions/transactions';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';



@Injectable()
export class PageConfig {
  menuPages: Array<{ title: string, component: any, icon: string, visible: boolean }>;

  constructor() {
    this.menuPages = [];
  }


  public refreshMenuPages(currentUser: UserAuthenticationResponse) {
    this.menuPages = [
      { title: 'Reward Summary', component: SummaryPage, icon: 'trophy', visible: true },
      {
        title: 'Cards', component: CardsPage, icon: 'card',
        visible: currentUser && currentUser.cards && currentUser.cards.length > 0
      },
      { title: 'Purchases', component: PurchasesPage, icon: 'cart', visible: true },
      { title: 'Transactions', component: TransactionsPage, icon: 'medal', visible: true },
      { title: 'My Account', component: AccountPage, icon: 'person', visible: true }
    ];
  }


}