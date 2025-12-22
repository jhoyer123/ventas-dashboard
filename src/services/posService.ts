import { supabase } from "@/api/supabaseClient";
import type { SaleInput } from "@/types/salePos";

//services para la seccion de POS

//service que trae los productos para la vista de punto de venta
export interface getProdutsPosI {
  p_branch_id: string;
  p_search_term: string;
  p_category_id: string | null;
  p_limit: number;
  p_offset: number;
}

export const getProdutsPos = async ({
  p_branch_id,
  p_search_term,
  p_category_id,
  p_limit,
  p_offset,
}: getProdutsPosI) => {
  const { data, error } = await supabase.rpc("get_pos_products", {
    p_branch_id,
    p_search_term,
    p_category_id,
    p_limit,
    p_offset,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//service que ejecuta la venta
export const createSale = async (dataSale: SaleInput) => {
  const { error } = await supabase.rpc("create_sale_transaction", {
    p_branch_id: dataSale.branchId,
    p_user_id: dataSale.userId,
    p_client_name: dataSale.clientName,
    p_client_nit: dataSale.clientNit,
    p_payment_method: dataSale.paymentMethod,
    p_status: dataSale.status,
    p_total_amount: dataSale.totalAmount,
    p_discount_amount: dataSale.discountAmount,
    p_final_amount: dataSale.finalAmount,
    p_debt_amount: dataSale.debtAmount,
    p_products: dataSale.products,
  });

  if (error) {
    console.error("Error al crear la venta:", error.message);
    throw new Error("Error al crear la venta: " + error.message);
  }

  return true;
};
