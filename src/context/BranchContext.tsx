import { createContext, useContext, useEffect } from "react";
import { useState, type ReactNode } from "react";
//importamos el contexto del user
import { useAuth } from "./AuthContext";

interface BranchContextType {
  currentBranch: string | null;
  setBranchId: (branchId: string | null) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const useBranch = () => {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used inside BranchProvider");
  return ctx;
};

export const BranchProvider = ({ children }: { children: ReactNode }) => {
  const [branchIdC, setBranchIdC] = useState<string | null>(null);

  const { user } = useAuth();

  //asignar la sucursal del user al estado de branchId
  useEffect(() => {
    if (user) {
      if (user.role === "SUPERADMIN") {
        setBranchIdC(null);
      } else {
        setBranchIdC(user.branchId ?? "bracnch-default");
      }
    }
  }, [user]);

  //cambiar de sucursal
  const setBranchId = (branchId: string | null) => {
    if (user?.role === "SUPERADMIN") {
      setBranchIdC(branchId);
    } else {
      console.warn("Solo SUPERADMIN puede cambiar de sucursal");
      return;
    }
  };

  return (
    <BranchContext.Provider
      value={{
        currentBranch: branchIdC,
        setBranchId,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};
