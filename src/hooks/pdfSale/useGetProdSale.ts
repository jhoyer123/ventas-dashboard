import { useQuery } from "@tanstack/react-query";
import { getProductsSale } from "@/services/pdfReceiptService";

//hook para obtener los productos de una venta
export const useGetProdSale = (saleId: string) => {
  return useQuery({
    queryKey: ["productsSale", saleId],
    queryFn: () => getProductsSale(saleId),
  });
};
