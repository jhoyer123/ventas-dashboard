import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
  return (
    <div className="flex items-center gap-1">
      {/* Información de página: Muy útil para el usuario */}
      <div className="flex items-center gap-1 text-sm font-medium text-card-foreground bg-card/10 px-1 py-1.5">
        <span className="text-muted-foreground hidden md:block">Página</span>
        <span className="text-muted-foreground md:hidden">Pág.</span>
        <span>{currentPage}</span>
        <span className="text-muted-foreground">de</span>
        <span>{totalPages || 1}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPreviousPage}
          className="p-2 text-card-foreground bg-card border border-ring rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
          title="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNextPage}
          className="p-2 text-card-foreground bg-card border border-ring rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
          title="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
