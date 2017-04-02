
export class PurchaseResponse {
  purchaseId: number;
  purchaseReferenceId: string;
  customerId: number;
  customerReferenceId: string;
  sourceId: number;
  sourceReferenceId: string;
  sourceName: string;
  note: string;
  earnedPoints: string;
  purchaseDate: Date;
  subtotal: string;
  discount: string;
  tax: string;
  shipping: string;
  grandtotal: string;
  currency: string;
  status: string;
  lineItems: Array<PurchaseLineItemResponse>;
}

class PurchaseLineItemResponse {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  lineTotal: number;
}