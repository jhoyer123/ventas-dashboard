import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStockFromBranch } from "@/services/stockService";

//hook para quitar stock de una sucursal
export const useRemoveStockFromBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeStockFromBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
