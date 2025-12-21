import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createSale } from "@/services/salesService";

//hook para crear ventas
export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      //invalidar queries relacionadas con ventas
      queryClient.invalidateQueries({ queryKey: ["posProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
