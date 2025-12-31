import { supabase } from "@/api/supabaseClient";
import type { DebtSummary } from "../types/daysType";

//service para traer las deudas pendientes en todo el rango de fechas
export const getDebt = async (branch_id:string | null): Promise<DebtSummary> => {
  const { data, error } = await supabase.rpc("report_total_pending_debt",{branch_id}).select().single();
  if (error) {
    throw new Error(error.message);
  }
  return data as DebtSummary;
};
