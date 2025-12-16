import { useQuery } from "@tanstack/react-query";
//service
import { getProductById as service } from "@/services/productService";

//get product by id service
export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => service(id),
    enabled: !!id,
    retry: false,
  }); //placeholder
};
