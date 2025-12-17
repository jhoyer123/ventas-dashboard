import { useQuery } from "@tanstack/react-query";
//importamos el service de get
import { getCategories } from "@/services/categoryServices";

//get vategory
export const useGetCategory = () => {
  return useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
};
