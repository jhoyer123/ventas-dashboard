import { useState, useMemo } from "react";
import type { PaginationState, SortingState } from "@tanstack/react-table";

// Define la estructura de los parámetros que se enviarán a la API (tu backend)
export interface ServerTableParams {
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: "asc" | "desc";
}

interface UseServerTableStateProps {
  initialPageSize?: number;
}

export function useServerTableState({
  initialPageSize = 10,
}: UseServerTableStateProps) {
  // Estado de Paginación que usa TanStack Table (base 0)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // Estado de Ordenamiento
  const [sorting, setSorting] = useState<SortingState>([]);

  // Estado de Búsqueda Global
  const [globalFilter, setGlobalFilter] = useState("");

  // Handler para el DebouncedInput, que también resetea la página a 0
  const onGlobalFilterChange = (value: string | number) => {
    setGlobalFilter(String(value));
    // CRUCIAL: Resetea a la primera página CADA VEZ que se aplica un filtro.
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  // Parámetros formateados para el Backend
  const apiParams: ServerTableParams = useMemo(() => {
    const [sortItem] = sorting; // Tomamos el primer elemento de SortingState

    return {
      page: pagination.pageIndex + 1, // API necesita página base 1
      limit: pagination.pageSize,
      search: globalFilter,
      sortField: sortItem?.id || "created_at", // Campo a ordenar (por defecto 'createdAt')
      sortOrder: sortItem?.desc ? "desc" : "asc",
    };
  }, [pagination, sorting, globalFilter]);
  //console.log("API Params HHOOKK:", apiParams);
  return {
    // Para pasar a DataTable
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,

    // Para el DebouncedInput
    onGlobalFilterChange,

    // Para useQuery
    apiParams,
  };
}
