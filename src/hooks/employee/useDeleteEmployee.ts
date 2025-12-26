import { deleteEmployee } from "@/services/employeeService";
import type { Employee } from "@/types/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//loque espera el service
interface DeleteEmployeeInput {
  idEmp: string;
  hasSystemAccess: boolean;
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, DeleteEmployeeInput>({
    mutationFn: (dataInput: DeleteEmployeeInput) =>
      deleteEmployee(dataInput.idEmp, dataInput.hasSystemAccess),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error al eliminar empleado:", error);
    },
  });
};
