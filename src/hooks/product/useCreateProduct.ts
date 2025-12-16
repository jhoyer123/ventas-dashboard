import { useMutation, useQueryClient } from "@tanstack/react-query";
//importar servicio
import { createProduct } from "@/services/productService";
import type { ProductInputService } from "@/schemes/product";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: ProductInputService) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error("Error creating product:", error.message);
    },
  });
};
