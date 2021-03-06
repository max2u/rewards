class PointTransactionResponse {
  transactionId: string;
  customerId: string;
  type: string;
  status: string;
  referenceId: string;
  points: number;
  pointValue: number;
  pointValueCurrency: string;
  note: string;
  timestamp: Date;
  rewardActionCategory: string;
  rewardActionName: string;
  expiration: Date;
}