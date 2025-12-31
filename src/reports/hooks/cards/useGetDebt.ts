import { useQuery } from "@tanstack/react-query";
import { getDebt } from "@/reports/services/wothoutRange";
import type { DebtSummary } from "../../types/daysType";
//hook para traer las deudas pendientes sin rango de fechas
export const useGetDebt = (branch_id: string | null) => {
  return useQuery<DebtSummary, Error>({
    queryKey: ["getDebt", branch_id],
    queryFn: () => getDebt(branch_id),
  });
};
