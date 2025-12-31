import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
  type OnChangeFn,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Pagination } from "./Paginacion"; // Ajusta la ruta según tu estructura

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
    state: {
      pagination,
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full h-full flex flex-col space-y-2">
      {/* TABLA CON ESTILOS PROFESIONALES */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">
        <div className="overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full min-w-[800px]">
            {/* HEADER MEJORADO */}
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className="px-2 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? "flex items-center gap-2 cursor-pointer select-none hover:text-gray-700 transition-colors"
                                : "flex items-center gap-2"
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="text-gray-400">
                                {header.column.getIsSorted() === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronsUpDown className="w-4 h-4" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            {/* BODY MEJORADO */}
            <tbody
              className={`bg-white divide-y divide-gray-200 ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-3"></div>
                          <p className="text-sm font-medium">
                            Cargando datos...
                          </p>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-12 h-12 text-gray-400 mb-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                          <p className="text-sm font-medium">
                            No hay datos disponibles
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Intenta ajustar los filtros de búsqueda
                          </p>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER CON CONTROLES - Estilos mejorados */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 py-2 bg-white border-t border-gray-200">
        {/* SELECT DE PÁGINA SIZE */}
        <div className="flex items-center gap-2 order-2 lg:order-1">
          <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
            Filas por página:
          </label>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* PAGINACIÓN CON NÚMEROS */}
        <div className="order-1 lg:order-2">
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(page: number) => {
              table.setPageIndex(page - 1); // Convertir de 1-indexed a 0-indexed
            }}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
          />
        </div>

        {/* TOTAL DE REGISTROS */}
        <div className="text-sm text-gray-600 order-3 whitespace-nowrap">
          Total: <span className="font-semibold text-gray-900">{rowCount}</span>{" "}
          registros
        </div>
      </div>
    </div>
  );
}
