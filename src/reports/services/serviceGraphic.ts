import { supabase } from "@/api/supabaseClient";
import type { DailyCashSummary, SalesDataDayMonth } from "../types/daysType";

//serive para traer las tarjetas info por dia
export const getCardsService = async ({
  report_date,
  branch_id,
}: {
  report_date: string;
  branch_id: string | null;
}): Promise<DailyCashSummary> => {
  const { data, error } = await supabase
    .rpc("report_daily_cash_summary", {
      report_date,
      branch_id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as DailyCashSummary;
};

//service para traer la info por dias (ejl: ultimos 7 dias) es un array
export interface InfoByDM {
  from_date: string;
  to_date: string;
  branch_id: string | null;
}
export const getInfoByDays = async (
  input: InfoByDM
): Promise<SalesDataDayMonth[]> => {
  const { data, error } = await supabase.rpc("report_sales_history", input);
  if (error) {
    throw new Error(error.message);
  }
  return data as SalesDataDayMonth[];
};

//service para traer la info por meses (ejl: ultimos 6 meses) es un array
export const getInfoByMonths = async (
  input: InfoByDM
): Promise<SalesDataDayMonth[]> => {
  const { data, error } = await supabase.rpc(
    "report_sales_history_month",
    input
  );
  if (error) {
    console.log("error en getInfoByMonths", error);
    throw new Error(error.message);
  }
  return data as SalesDataDayMonth[];
};
