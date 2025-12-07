import { DataTable } from "./DataTable"; // Asegúrate que esta ruta es correcta
import { DebouncedInput } from "./DebouncedInput"; // Asegúrate que esta ruta es correcta
import { columnsPersonal } from "../pages/employee/columnsPersonal"; // Asegúrate que esta ruta es correcta
import useGetEmployee from "../hooks/employee/useGetEmployee";
// Importamos el nuevo Hook
import {
  useServerTableState,
} from "./useServerTableState";

export default function EmployeesPage() {
  const tableState = useServerTableState({});

  const { data, isLoading } = useGetEmployee(tableState);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Empleados</h1>

      {/* Buscador Global (Usa el handler del Hook) */}
      <DebouncedInput
        valueDafault={tableState.globalFilter ?? ""}
        onChange={tableState.onGlobalFilterChange}
      />

      {/* Tabla Reutilizable */}
      <DataTable
        columns={columnsPersonal}
        data={data?.data ?? []}
        rowCount={data?.meta.total ?? 0}
        // Pasamos directamente el estado del Hook
        pagination={tableState.pagination}
        setPagination={tableState.setPagination}
        sorting={tableState.sorting}
        setSorting={tableState.setSorting}
        isLoading={isLoading}
      />
    </div>
  );
}
