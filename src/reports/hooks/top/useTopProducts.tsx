import { useQuery } from "@tanstack/react-query";
import { useTopProducts } from "@/reports/services/topService";
import type { TopProductB } from "@/reports/types/tops";

//hook para obtener los productos mas vendidos
export const useQueryTopProducts = (branchId: string | null, limit: number) => {
  return useQuery<TopProductB[], Error>({
    queryKey: ["top-products", branchId, limit],
    queryFn: () => useTopProducts(branchId, limit),
  });
};
