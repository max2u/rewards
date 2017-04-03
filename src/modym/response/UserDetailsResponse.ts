
export class UserDetailsResponse{

  customerId: string;
  referenceId: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneMobile: string;
  gender: string;

  dateOfBirth: Date;
  position: string;
  company: string;
  address1: string;
  address2: string;
  postcode: string;

  enabled: boolean;

  organizationName: string;
  organizationCode: string;

  countryName: string;
  countryCode: string;

  cityName: string;
  languageName: string;
  languageCode: string;


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

  cards: CardData[];
}

class CardData {
  cardNumber: string;
  nameOnCard: string;
  issued: Date;
  levelName: string;
  levelImage: string;
  printed: boolean;
  active: boolean;
}