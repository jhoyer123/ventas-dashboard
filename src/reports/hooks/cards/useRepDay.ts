import { useQuery } from "@tanstack/react-query";
import { getCardsService } from "@/reports/services/serviceGraphic";
import type { DailyCashSummary } from "../../types/daysType";

//hook para traer datos diarios del reporte
export const useRepDay = ({
  report_date,
  branch_id,
}: {
  report_date: string;
  branch_id: string | null;
}) => {
  return useQuery<DailyCashSummary, Error>({
    queryKey: ["repDay", report_date, branch_id],
    queryFn: () => getCardsService({ report_date, branch_id }),
  });
};
