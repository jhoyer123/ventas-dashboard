import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addStockToBranch } from "@/services/stockService";

//hook para agregar stock a una sucursal
export const useAddStockBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStockToBranch,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
};
