import { useQuery } from "@tanstack/react-query";
//import del service
import { getBranchWP } from "@/services/branchService";

export const useGetBranckSP = (productId: string) => {
  return useQuery({
    queryKey: ["branchesWP"],
    queryFn: () => getBranchWP(productId),
    enabled: !!productId,
    staleTime: 0,
    placeholderData: () => [],
  });
};
