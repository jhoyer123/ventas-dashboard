import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCategory } from "@/services/categoryServices";
import type { categoryInput } from "@/types/category";

interface data {
  id: string;
  dataCat: categoryInput;
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dataCat }: data) => updateCategory(id, dataCat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log("Error al actualizar la categoria", error);
    },
  });
};
