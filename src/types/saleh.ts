export interface SaleH {
  id: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: "COMPLETED" | "PENDING" | "CANCELLED";
  clientName: string;
  clientNit: string;
  paymentMethod: string;
  branchId: string;
  userId: string;
  debtAmount: number;
  created_at: Date;
  updated_at: Date;
  receiptNumber: string;
  //datos adicionales
  userName?: string;
  branchName?: string;
}



