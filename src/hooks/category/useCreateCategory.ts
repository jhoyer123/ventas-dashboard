import { useMutation, useQueryClient } from "@tanstack/react-query";
//importamos los tipos
import type { categoryType, categoryInput } from "@/types/category";
//traemos el service de creacion
import { createCategory } from "@/services/categoryServices";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
    console.log("llega al hook");
  return useMutation<categoryType, Error, categoryInput>({
    mutationFn: (dataCat) => createCategory(dataCat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log("Error al crear la categoria", error);
    },
  });
};
