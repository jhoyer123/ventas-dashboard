//hook para eliminar un producto de una sucursal especifica
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductByBranch } from "@/services/productService";

export const useDeleteProductE = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, branchId }: { id: string; branchId: string }) =>
      deleteProductByBranch(id, branchId),
    onSuccess: () => {
      //invalidar y refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error deleting product from branch:", error);
    },
  });
};
