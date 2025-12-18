import type { AddStockFormValues } from "@/schemes/branchProd";

//type de agregar o crear un producto en una sucursal
export interface StockBranchI {
  branchId: string;
  stock: number;
}

//añadir stock a un producto en una sucursal
export interface addStockToBranchP {
  branchId: string;
  userId: string;
  productId: string;
  dataI: AddStockFormValues;
}