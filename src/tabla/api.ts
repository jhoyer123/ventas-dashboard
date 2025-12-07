// La estructura que debe devolver tu Backend siempre
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;       // Total de registros en la BD (para calcular páginas)
    page: number;        // Página actual
    limit: number;       // Items por página
    totalPages: number;  // Total de páginas
  };
}

// Parámetros que enviaremos al Backend
export interface TableParams {
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
  sorting: { id: string; desc: boolean }[];
}   