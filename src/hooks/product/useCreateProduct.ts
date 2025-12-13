import { useMutation, useQueryClient } from "@tanstack/react-query";
//importar types
import type { productInputService } from "@/types/product";
//importar servicio
import { createProduct } from "@/services/productService";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: productInputService) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error("Error creating product:", error.message);
    },
  });
};
