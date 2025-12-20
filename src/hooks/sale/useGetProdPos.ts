import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getProdutsPos } from "@/services/salesService";

//hook para traer los productos a la pagina de ventas
export const useGetProdPos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getProdutsPos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posProducts"] });
    },
    onError: (error: Error) => {
      console.error("Error fetching POS products:", error.message);
    },
  });
};
