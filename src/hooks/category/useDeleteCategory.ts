import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/services/categoryServices";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log("Error al eliminar la categoria", error);
    },
  });
};
