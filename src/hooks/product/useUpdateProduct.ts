import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/services/productService";
import type { ProductSupT } from "@/types/product";

//hook de actualización de producto
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductSupT }) =>
      updateProduct(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error("Error updating product:", error.message);
    },
  });
};
