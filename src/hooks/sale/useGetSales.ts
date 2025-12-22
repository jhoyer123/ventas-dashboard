import { useQuery } from "@tanstack/react-query";
import { getSalesH } from "@/services/salehService";
import type { queryParams } from "@/types/table";

export const useGetSalesH = (params: queryParams) => {
  return useQuery({
    queryKey: ["salesH", params],
    queryFn: () => getSalesH(params),
  });
};
