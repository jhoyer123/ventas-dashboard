import { supabase } from "@/api/supabaseClient";
import type { queryParams } from "@/types/table";

//service que trae las ventas realizadas
export const getSalesH = async (params: queryParams) => {
  const { page, limit, search, sortField, sortOrder, branchId } = params;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("sales_details_view")
    .select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `clientName.ilike.%${search}%,employee_name.ilike.%${search}%`
    );
  }

  if (branchId) {
    query = query.eq("branchId", branchId);
  }

  if (sortField) {
    query = query.order(sortField, {
      ascending: sortOrder === "asc",
    });
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching sales:", error);
    throw new Error(error.message);
  }

  const dataRefined = data?.map((item) => ({
    ...item,
    userName: item.users?.employees.name || "Desconocido",
    branchName: item.branches?.branchName || "Desconocida",
  }));

  return {
    data: dataRefined ?? [],
    meta: {
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
};

interface DebtPayPayload {
  p_sale_id: string;
  p_amount: number;
  p_payment_method: string;
  p_note?: string;
}

//service de pago de deudas
export const payDebt = async (payload: DebtPayPayload) => {
  const { data, error } = await supabase.rpc("adddebtpayment", {
    p_sale_id: payload.p_sale_id,
    p_amount: payload.p_amount,
    p_payment_method: payload.p_payment_method,
    p_note: payload.p_note,
  });

  if (error) {
    console.error("Error al pagar la deuda:", error.message);
    throw new Error(error.message);
  }

  return data;
};

//Service para cancelar una venta
export const cancelSale = async (saleId: string, userId: string) => {
  const { data, error } = await supabase.rpc("cancel_sale", {
    p_sale_id: saleId,
    p_user_id: userId,
  });

  if (error) {
    console.error("Error al cancelar la venta:", error.message);
    throw new Error("No se pudo cancelar la venta");
  }

  return data;
};
