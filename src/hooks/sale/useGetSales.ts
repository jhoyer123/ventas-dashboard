import { useQuery } from "@tanstack/react-query";
import { getSalesH } from "@/services/salehService";
import type { queryParams } from "@/types/table";
import { useEffect, useRef } from "react";

export const useGetSalesH = (params: queryParams) => {
  const prevBranch = useRef(params.branchId);
  const isSwitching = prevBranch.current !== params.branchId;

  useEffect(() => {
    prevBranch.current = params.branchId;
  }, [params.branchId]);

  return useQuery({
    queryKey: ["salesH", params],
    queryFn: () => getSalesH(params),
    enabled: !isSwitching,
  });
};
