import { useQuery } from "@tanstack/react-query";
import { getMovements } from "@/services/movementService";
import type { queryParams } from "@/types/table";
import { useEffect, useRef } from "react";

//este hook trae todos los movimientos
export const useGetMovements = (
  params: queryParams,
  branchId: string | null,
) => {
  const prevBranch = useRef(branchId);
  const isSwitching = prevBranch.current !== branchId;

  useEffect(() => {
    prevBranch.current = branchId;
  }, [branchId]);

  return useQuery({
    queryKey: ["movements", params, branchId],
    queryFn: () => getMovements(params, branchId),
    enabled: !isSwitching,
  });
};
