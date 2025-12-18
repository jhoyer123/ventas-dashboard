import { supabase } from "@/api/supabaseClient";
import {
  type addStockToBranchP,
  type StockBranchI,
} from "../types/stockProdBranch";
import type {
  RemoveStockValues,
  TransferStockValues,
} from "@/schemes/branchProd";

//porps de la funcion createProdBranch
export interface createProdBranchP {
  dataStock: StockBranchI[];
  pId: string;
}

//insertar o agergar o productos a sucursales
export const createProdBranch = async ({
  dataStock,
  pId,
}: createProdBranchP) => {
  const dataInsert = dataStock.map((item) => ({
    branchId: item.branchId,
    productId: pId,
    stock: item.stock,
  }));

  const { data, error } = await supabase
    .from("branchStocks")
    .insert(dataInsert)
    .select();

  if (error) {
    // Si el error es de "duplicado", lo manejamos para que el dashboard no explote
    if (error.code === "23505") {
      throw new Error("El producto ya fue asignado a una de estas sucursales.");
    }
    throw new Error(error.message);
  }

  return data;
};

//añadir stock a un producto en una sucursal
export const addStockToBranch = async ({
  userId,
  branchId,
  productId,
  dataI,
}: addStockToBranchP) => {
  const { error } = await supabase.rpc("add_stock_with_movement", {
    p_user_id: userId,
    p_branch_id: branchId,
    p_product_id: productId,
    p_quantity: dataI.quantity,
  });

  if (error) throw new Error(error.message);

  return { success: true };
};

interface removeStockFromBranchP {
  userId: string;
  branchId: string;
  productId: string;
  dataI: RemoveStockValues;
}

//quitar stock a un producto en una sucursal
export const removeStockFromBranch = async ({
  userId,
  branchId,
  productId,
  dataI,
}: removeStockFromBranchP) => {
  const { error } = await supabase.rpc("decrease_stock_with_movement", {
    p_user_id: userId,
    p_branch_id: branchId,
    p_product_id: productId,
    p_quantity: dataI.quantity,
    p_desc: dataI.reason,
  });

  // Si la validación de la base de datos falla (stock < quantity),
  // el error caerá aquí con el mensaje personalizado que pusimos en el SQL.
  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
};

//transferir stock entre sucursales
interface transferStockBetweenBranchesP {
  userId: string;
  branchFrom: string;
  productId: string;
  dataI: TransferStockValues;
}
export const transferStockBetweenBranches = async ({
  userId,
  branchFrom,
  productId,
  dataI,
}: transferStockBetweenBranchesP) => {
  const { error } = await supabase.rpc("transfer_stock_with_movement", {
    p_user_id: userId,
    p_from_branch: branchFrom,
    p_to_branch: dataI.destinationBranchId,
    p_product_id: productId,
    p_quantity: dataI.quantity,
  });

  if (error) {
    throw new Error("Error al transferir stock");
  }

  return { success: true };
};
