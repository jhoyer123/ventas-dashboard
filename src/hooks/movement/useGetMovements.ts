import { useQuery } from "@tanstack/react-query";
import { getMovements } from "@/services/movementService";
import type { queryParams } from "@/types/table";

//este hook trae todos los movimientos
export const useGetMovements = (
  params: queryParams,
  branchId: string | null,
) => {
  return useQuery({
    queryKey: ["movements", params, branchId],
    queryFn: () => getMovements(params, branchId),
  });
};
