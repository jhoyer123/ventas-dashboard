import { useQuery } from "@tanstack/react-query";
import { getCategoriesForSales } from "@/services/categoryServices";

//hook para obtener las categorias para la vista de ventas
export const useGetCatForSale = () => {
  return useQuery({
    queryFn: getCategoriesForSales,
    queryKey: ["categoriesForSale"],
  });
};
