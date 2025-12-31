import { useQuery } from "@tanstack/react-query";
import {
  getInfoByMonths,
  type InfoByDM,
} from "@/reports/services/serviceGraphic";
import type { SalesDataDayMonth } from "@/reports/types/daysType";

//hook que trae os datos por meses
export const useRepMonths = ({
  input,
  enable,
}: {
  input: InfoByDM;
  enable?: boolean;
}) => {
  return useQuery<SalesDataDayMonth[], Error>({
    queryKey: ["repMonths", input],
    queryFn: () => getInfoByMonths(input),
    enabled: enable,
  });
};
