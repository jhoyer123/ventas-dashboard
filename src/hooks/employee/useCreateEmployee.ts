import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "@/services/employeeService";
import { type Employee } from "@/types/employee";
import { type FormEmployeeInput } from "@/types/employee";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, FormEmployeeInput>({
    mutationFn: (newEmployee) => createEmployee(newEmployee),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    // Opcional: Manejo de errores
    onError: (error) => {
      console.error("Error al crear sucursal:", error.message);
    },
  });
};
