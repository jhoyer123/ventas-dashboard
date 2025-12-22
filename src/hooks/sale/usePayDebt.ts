import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payDebt } from "@/services/salehService";

//hook que maneja el pago de deudas
export const usePayDebt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesH"] });
    },
    onError: (error) => {
      console.error("Error al pagar la deuda:", error);
    },
  });
};
