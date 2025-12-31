//import del hook de cards diario
import { useRepDay } from "@/reports/hooks/cards/useRepDay";
//hook para traer las deudas
import { useGetDebt } from "@/reports/hooks/cards/useGetDebt";
import { useMemo } from "react";

export const useInfoCards = ({
  currentBranch,
}: {
  currentBranch: string | null;
}) => {
  // Memorizar la fecha para que no cambie en cada render
  // Obtener fecha en formato YYYY-MM-DD (sin hora)
  const reportDate = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);
  // Usar el hook para obtener el resumen diario
  const { data: summaryData } = useRepDay({
    report_date: reportDate, // "2024-12-27"
    branch_id: currentBranch,
  });
  //usamos el hook para traer las deudas pendientes
  const { data: debtData } = useGetDebt(currentBranch);

  //data que se pasa a las cards
  const data = useMemo(() => {
    return {
      cash_received_amount: summaryData?.cash_received_amount ?? 0,
      total_pending_debt: debtData?.total_pending_debt ?? 0,
      completed_sales_amount: summaryData?.completed_sales_amount ?? 0,
      total_discounts: summaryData?.total_discounts ?? 0,
      total_sales_count: summaryData?.total_sales_count ?? 0,
    };
  }, [summaryData, debtData]);

  return data;
};
