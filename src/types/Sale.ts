//type para el input de la venta
interface ProductSaleInput {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

type paymentMethod = "CASH" | "CARD" | "TRANSFER" | "QR" | "CREDIT";

type statusSale = "PENDING" | "COMPLETED" | "CANCELED";

export interface SaleInput {
  branchId: string;
  userId: string;
  clientName: string;
  clientNit: string;
  paymentMethod: paymentMethod;
  status: statusSale;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  debtAmount: number;
  products: ProductSaleInput[];
}
