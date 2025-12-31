import { useQuery } from "@tanstack/react-query";
import { getInfoByDays } from "@/reports/services/serviceGraphic";
import type { InfoByDM } from "@/reports/services/serviceGraphic";
import type { SalesDataDayMonth } from "@/reports/types/daysType";

//hook para traer datos diarios del reporte  (ejl: ultimos 7 dias)
export const useRepDays = ({
  input,
  enable,
}: {
  input: InfoByDM;
  enable?: boolean;
}) => {
  return useQuery<SalesDataDayMonth[], Error>({
    queryKey: ["repDays", input],
    queryFn: () => getInfoByDays(input),
    enabled: enable,
  });
};
