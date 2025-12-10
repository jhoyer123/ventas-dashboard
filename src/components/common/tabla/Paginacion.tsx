import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number; // Página actual (1-indexed)
  totalPages: number; // Total de páginas
  onPageChange: (page: number) => void; // Callback cuando cambia la página
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  canPreviousPage,
  canNextPage,
}: PaginationProps) {
  // Función para generar el array de números de página a mostrar
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    // Si hay 7 páginas o menos, mostrar todas
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Siempre mostrar la primera página
    pages.push(1);

    // Calcular el rango de páginas a mostrar alrededor de la página actual
    if (currentPage <= 3) {
      // Cerca del inicio: [1] [2] [3] [4] ... [10]
      pages.push(2, 3, 4);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Cerca del final: [1] ... [7] [8] [9] [10]
      pages.push("...");
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // En el medio: [1] ... [5] [6] [7] ... [10]
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center gap-1">
      {/* BOTÓN ANTERIOR */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPreviousPage}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* NÚMEROS DE PÁGINA */}
      <div className="hidden sm:flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-1.5 text-sm text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                ${
                  isActive
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* BOTÓN SIGUIENTE */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNextPage}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
