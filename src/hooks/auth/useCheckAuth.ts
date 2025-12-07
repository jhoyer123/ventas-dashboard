import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../services/authService";

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: checkAuth,
    retry: false,
  });
};
