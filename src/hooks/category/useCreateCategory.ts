import { useMutation, useQueryClient } from "@tanstack/react-query";
//importamos los tipos
import type { CategoryType, categoryInput } from "@/types/category";
//traemos el service de creacion
import { createCategory } from "@/services/categoryServices";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<CategoryType, Error, categoryInput>({
    mutationFn: (dataCat) => createCategory(dataCat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log("Error al crear la categoria", error);
    },
  });
};
