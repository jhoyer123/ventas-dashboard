import { useQueryClient, useMutation } from "@tanstack/react-query";
import { transferStockBetweenBranches } from "@/services/stockService";

//hook para transferir stock entre sucursales
export const useTransferStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transferStockBetweenBranches,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["productStockBranches"],
      });
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
