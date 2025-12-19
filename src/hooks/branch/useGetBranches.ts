import { useQuery, keepPreviousData } from "@tanstack/react-query";
//import lis types
import type { BranchOutput } from "@/types/branch";
//import del service
import { getBranchesES } from "@/services/branchService";

//El Custom Hook Profesional (este hook trae sucursales de una funcion RPC con stats)
export const useGetBranches = () => {
  return useQuery<BranchOutput[], Error>({
    // La queryKey incluye los filtros. Si "filters" cambia,
    // React Query refetch automatically.
    queryKey: ["branches"],

    // La función que ejecuta la promesa
    queryFn: getBranchesES,

    // CONFIGURACIÓN PRO:

    // 1. placeholderData con keepPreviousData:
    // Mantiene los datos viejos mientras cargan los nuevos (ideal para paginación)
    placeholderData: keepPreviousData,

    // 2. staleTime:
    // Los datos se consideran frescos por 5 minutos.
    // No hará refetch si el usuario cambia de ventana y vuelve rápido.
    staleTime: 1000 * 60 * 5,

    // 3. gcTime (antes cacheTime):
    // Cuánto tiempo se mantienen en memoria si no se usan (10 mins)
    gcTime: 1000 * 60 * 10,

    // 4. rety:
    // Cuántas veces reintentar si falla la red (default es 3)
    retry: 1,
  });
};
