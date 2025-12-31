// types/receipt.ts
export type ReceiptItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type ReceiptData = {
  receiptNumber: string;
  created_at: Date;

  //datos adicionales
  userName?: string;
  branchName?: string;

  clientName?: string;
  clientNit?: string;

  paymentMethod: string;
  status: "COMPLETED" | "PENDING" | "CANCELLED";

  totalAmount: number;
  discountAmount?: number;
  finalAmount: number;
  debtAmount?: number;

  items?: ReceiptItem[];
};
