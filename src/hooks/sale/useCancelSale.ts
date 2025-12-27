import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelSale } from "@/services/salehService";

//hook para cancelar venta
export const useCancelSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ saleId, userId }: { saleId: string; userId: string }) =>
      cancelSale(saleId, userId),
    onSuccess: () => {
      //invalidar query de ventas
      queryClient.invalidateQueries({ queryKey: ["salesH"] });
    },
  });
};
