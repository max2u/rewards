
export class PurchaseResponse {
  purchaseId: string;
  purchaseReferenceId: string;
  customerId: string;
  customerReferenceId: string;
  sourceId: string;
  sourceReferenceId: string;
  sourceName: string;
  note: string;
  earnedPoints: number;
  purchaseDate: Date;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  grandtotal: number;
  currency: string;
  status: string;
  lineItems: Array<PurchaseLineItemResponse>;
}

class PurchaseLineItemResponse {
  productId: number;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  lineTotal: number;
}