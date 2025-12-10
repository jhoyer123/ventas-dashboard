import { DataTable } from "../../components/common/tabla/DataTable";
import { DebouncedInput } from "../../components/common/tabla/DebouncedInput";
import { columnsPersonal } from "./columnsEmployee";
import useGetEmployee from "../../hooks/employee/useGetEmployee";
// Importamos el nuevo Hook
import { useServerTableState } from "../../components/common/tabla/useServerTableState";
//context de la sucursal
import { useBranch } from "../../context/BranchContext";

export default function PersonalPage() {
  const tableState = useServerTableState({});
  const { currentBranch } = useBranch();
  const { data, isLoading } = useGetEmployee(tableState, currentBranch || null);

  return (
    // calcular alture - 64px del header
    <div className="h-[calc(100vh-64px)] flex flex-col px-4 py-4 gap-4">
      {/* HEADER - Altura fija */}
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">
          Lista de Empleados
          <span className="text-sm font-normal text-gray-500 block">
            Sin acceso al sistema
          </span>
        </h1>

        <DebouncedInput
          valueDafault={tableState.globalFilter ?? ""}
          onChange={tableState.onGlobalFilterChange}
          placeholder="Buscar empleados..."
        />
      </div>

      {/* TABLA - Crece para ocupar espacio restante */}
      <div className="flex-1 min-h-0">
        <DataTable
          columns={columnsPersonal}
          data={data?.data || []}
          rowCount={data?.meta.total ?? 0}
          pagination={tableState.pagination}
          setPagination={tableState.setPagination}
          sorting={tableState.sorting}
          setSorting={tableState.setSorting}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
