import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
//hook para cerrar sesión
export const useLogout = () => {
  
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
    
    onError: (error) => {
      console.error("Error al cerrar sesión (aún redirigimos):", error);
      // Opcional: Redirigir incluso en caso de error, ya que el estado local debe limpiarse
      navigate("/");
    },
  });
};
