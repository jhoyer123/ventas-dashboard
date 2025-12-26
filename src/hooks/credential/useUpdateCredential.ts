import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeCredentials } from "@/services/credentialService";
//type del servicio
import { type UpdateEmployeeCredentialsI } from "@/services/credentialService";

//hook para actualizar las credenciales de un empleado (email y password)
export const useUpdateCredential = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateEmployeeCredentialsI) =>
      updateEmployeeCredentials(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
