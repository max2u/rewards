export class UserAuthenticationResponse {

  token: string;
  expiration: any;

  customerId: string;
  referenceId: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneMobile: string;
  gender: string;

  lifetimeRevenue: number;
  lifetimeRevenueCurrency: string;
  purchaseCount: number;
  lastPurchase: any;

  levelName: string;
  levelImage: string;

  pointValueCurrency: string;

  totalPoints: number;
  totalPointsValue: number;

  availablePoints: number;
  availablePointsValue: number;

  totalLifetimePoints: number;
  totalLifetimePointsValue: number;

  totalLifetimeConsumedPoints: number;
  totalLifetimeConsumedPointsValue: number;

  totalPendingCreditPoints: number;
  totalAuthorizedDebitPoints: number;
  
  cards : CardData[];
}


class CardData{
  cardNumber : string;
  nameOnCard : string;
  issued: Date;
  levelName : string;
  levelImage : string;
}