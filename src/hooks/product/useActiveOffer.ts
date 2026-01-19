import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateOfferProduct } from "@/services/productService";
import type { OfferFormValues } from "@/schemes/product";

interface ActivateOfferParams {
  offerData: OfferFormValues;
  prodId: string;
}
//hook para activar oferta en producto
export const useActiveOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ offerData, prodId }: ActivateOfferParams) =>
      activateOfferProduct(offerData, prodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
