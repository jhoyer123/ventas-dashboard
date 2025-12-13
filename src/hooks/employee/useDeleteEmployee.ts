import { deleteEmployee } from "@/services/employeeService";
import type { Employee } from "@/types/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, string>({
    mutationFn: (idEmp) => deleteEmployee(idEmp),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error al eliminar empleado:", error);
    },
  });
};
