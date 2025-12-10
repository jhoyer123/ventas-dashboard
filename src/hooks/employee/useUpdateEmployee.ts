import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "@/services/employeeService";
import { type Employee } from "@/types/employee";
import { type FormEmployeeInput } from "@/types/employee";

interface dataInput {
  id: string;
  dataEmployee: FormEmployeeInput;
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, dataInput>({
    mutationFn: ({ id, dataEmployee }) => updateEmployee(dataEmployee, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error al actualizar empleado:", error.message);
    },
  });
};
