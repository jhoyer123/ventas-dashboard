import { useQuery } from "@tanstack/react-query";
import { type TopProductB } from "@/reports/types/tops";
import { getTopBranches } from "@/reports/services/topService";

//hook es para top de suscursales
export const useQueryTopBranches = (limit: number) => {
  return useQuery<TopProductB[], Error>({
    queryKey: ["top-branches", limit],
    queryFn: () => getTopBranches(limit),
  });
};
