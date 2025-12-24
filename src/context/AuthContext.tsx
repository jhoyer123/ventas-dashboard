import { createContext, useContext, type ReactNode } from "react";
import { useCheckAuth } from "../hooks/auth/useCheckAuth";
import { useLogout } from "../hooks/auth/useLogout";
//types para el user - context
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}
//creamos el context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
//hook para usar el context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return ctx;
};
//componente proveedor del context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useCheckAuth(); // TanStack Query hook que hace el /me

  const user = data ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout: useLogout().mutateAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
