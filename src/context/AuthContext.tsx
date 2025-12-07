import { createContext, useContext, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckAuth } from "../hooks/auth/useCheckAuth";
import { useLogout } from "../hooks/auth/useLogout";

type Role = "SUPERADMIN" | "ADMIN" | "SELLER" | "INVENTORY";

export interface User {
  userId: string;
  name: string;
  email: string;
  role: Role;
  //implementar
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useCheckAuth(); // TanStack Query hook que hace el /me
  const logoutMutation = useLogout();

  const user = data?.user ?? null;

  const logout = async () => {
    await logoutMutation.mutateAsync();
    // make sure also to clear React state/cache if needed (we removed "me" in onSuccess)
    queryClient.removeQueries({ queryKey: ["me"] });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
