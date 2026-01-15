import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
  type OnChangeFn,
} from "@tanstack/react-table";

import { Pagination } from "./Paginacion";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  pagination,
  setPagination,
  sorting,
  setSorting,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: rowCount > 0 ? Math.ceil(rowCount / pagination.pageSize) : 0,
    state: { pagination, sorting },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full min-h-[500px] w-full bg-card rounded-xl border border-border shadow-sm relative">
      {isLoading && (
        <div className="absolute inset-0 bg-card backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            {/* Spinner animado */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-border rounded-full"></div>
              <div className="w-16 h-16 border-4 border-chart-3 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>

            {/* Texto */}
            <div className="text-center">
              <p className="text-sm font-semibold text-card-foreground">
                Cargando datos
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Por favor espera...
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Contenedor de la tabla */}
      <div className="flex-1 overflow-auto rounded-xl h-full relative isolate">
        <table className="w-full text-left border-collapse rounded-xl">
          <thead className="sticky top-0 z-30 bg-card">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-card border-b border-border"
              >
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className={`px-4 py-3.5 text-xs font-body bg-ring/10 uppercase transition-colors ${
                        isSorted ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center gap-2 cursor-pointer select-none hover:text-primary transition-colors"
                              : "flex items-center gap-2"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <>
                              {isSorted === "asc" && (
                                <ArrowUp className="w-3.5 h-3.5 text-primary" />
                              )}
                              {isSorted === "desc" && (
                                <ArrowDown className="w-3.5 h-3.5 text-primary" />
                              )}
                              {!isSorted && (
                                <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-ring/10">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-4 text-sm text-card-foreground align-top"
                  >
                    <div className="min-h-12 flex items-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER CON CONTROLES PROFESIONALES */}
      <div
        className="px-1 py-2 bg-ring/10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 rounded-b-xl
      md:px-3 md:justify-around"
      >
        {/* IZQUIERDA: Selector de cantidad (Solo visible en Desktop/Tablet) */}
        <div className="hidden sm:flex sm:justify-center sm:items-center gap-2 ">
          <span className="font-body font-medium text-sm text-muted-foreground tracking-wider">
            Mostrar:
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-card border border-border text-card-foreground text-sm rounded-lg focus:border-ring block p-1.5 shadow-sm hover:border-border transition-all outline-none cursor-pointer"
          >
            {[10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* CENTRO/DERECHA: Paginación */}
        <div
          className="flex items-center gap-4 w-full justify-center
        md:w-auto"
        >
          <div className="text-sm text-muted-foreground sm:hidden">
            Total:{" "}
            <span className="font-bold text-muted-foreground">{rowCount}</span>
          </div>

          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
          />
        </div>

        {/* DERECHA: Total de registros (Oculto en móvil para no saturar) */}
        <div className="hidden lg:block text-sm text-muted-foreground">
          Mostrando registros del{" "}
          <span>
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
          </span>{" "}
          al{" "}
          <span>
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              rowCount
            )}
          </span>{" "}
          de <span>{rowCount}</span>
        </div>
      </div>
    </div>
  );
}
