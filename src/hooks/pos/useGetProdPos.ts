import { useQuery, keepPreviousData } from "@tanstack/react-query"; // 1. Importar la función
import { getProdutsPos } from "@/services/posService";
import type { getProdutsPosI } from "@/services/posService";

export const useGetProdPos = (data: getProdutsPosI) => {
  return useQuery({
    queryKey: [
      "posProducts",
      data.p_branch_id,
      data.p_search_term,
      data.p_category_id,
      data.p_offset,
    ],
    queryFn: () => getProdutsPos(data),
    enabled: !!data.p_branch_id,
    placeholderData: keepPreviousData,
  });
};
