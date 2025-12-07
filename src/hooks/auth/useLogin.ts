import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,

    onSuccess: () => {
      navigate("/dashboard");
    },

    onError: (error: any) => {
      console.log("Redirigiendo a home");
      navigate("/");
      console.error("Error en login:", error);
      throw error;
    },
  });
};
