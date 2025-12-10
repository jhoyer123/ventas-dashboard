import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBranch } from "@/services/branchService";
//importar lo types del branch
import type { BranchOutput } from "@/types/branch";

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation<BranchOutput, Error, string>({
    // La función 'mutationFn' que llama a tu API de Supabase
    mutationFn: (branchData) => deleteBranch(branchData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },

    onError: (error) => {
      console.error("Error al eliminar sucursal:", error.message);
    },
  });
};
