import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/authService";
import type { PasswordChange } from "@/types/auth";

//hook para el cambio de contraseña
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: PasswordChange) => changePassword(data),
  });
};
