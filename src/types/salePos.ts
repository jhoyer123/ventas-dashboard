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

// Interfaces para el punto de venta
export interface ProductPos {
  id: string;
  name_prod: string;
  sku: string | null;
  price: number;
  price_offer: number | null;
  start_date: string;
  end_date: string;
  is_offer_active: boolean;
  stock: number;
  main_image: string;
}

export interface CartItem extends ProductPos {
  quantity: number;
  subtotal: number;
}

export interface Totals {
  subtotal: number;
  tax: number;
  calculatedTotal: number;
  finalAmount: number;
  difference: number;
}

export interface Client {
  name: string;
  idNit?: string;
}

export type EditingQtyMap = Record<string, string>;
