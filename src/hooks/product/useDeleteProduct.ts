import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductG } from "@/services/productService";

//hook de eliminar producto
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProductG(id),
    onSuccess: () => {
      //invalidar y refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};
