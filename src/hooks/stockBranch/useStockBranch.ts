import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type createProdBranchP } from "@/services/stockService";
import { createProdBranch } from "@/services/stockService";

export const useStockBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dataStock, pId }: createProdBranchP) =>
      createProdBranch({ dataStock, pId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "branchesWP"] });
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
