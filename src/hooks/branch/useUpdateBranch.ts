import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBranch } from "@/services/branchService";
//importar lo types del branch
import type { BranchOutput, updateType } from "@/types/branch";
//import toast
//import { toast } from "sonner";

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation<BranchOutput, Error, updateType>({
    mutationFn: (updateData) => updateBranch(updateData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      /* toast.success("Sucursal actualizada con éxito", {
        position: "top-right",
        duration: 4000,
      }); */
    },

    onError: (error) => {
      console.error("Error al actualizar sucursal:", error.message);
      /* toast.error("Error al actualizar sucursal", {
        position: "top-right",
        duration: 4000,
      }); */
    },
  });
};
