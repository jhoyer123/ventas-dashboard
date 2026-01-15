//type para las ventas (sales) el historial de ventas
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
  user_cancel: string | null;
  receiptNumber: string;
  //datos adicionales
  employee_name?: string;
  branch_name?: string;
}
