import { DataTable } from "../../components/common/tabla/DataTable";
import { DebouncedInput } from "../../components/common/tabla/DebouncedInput";
import { Button } from "@/components/ui/button";
import { useServerTableState } from "../../components/common/tabla/useServerTableState";
//context de la sucursal
import { useBranch } from "../../context/BranchContext";
//hook para obtener productos
import useGetprodut from "@/hooks/product/useGetProduct";
//columnas de la tabla
import { columnsProduct } from "./ColumnsProduct";
import { Link } from "react-router-dom";

export default function Product() {
  //logica de la tabla
  const tableState = useServerTableState({});

  //usamos el contexto de sucursal
  const { currentBranch } = useBranch();

  //obtenemos los productos segun el estado de la tabla y la sucursal actual
  const { data, isLoading } = useGetprodut(tableState, currentBranch);

  

  return (
    // calcular alture - 64px del header
    <div className="h-[calc(100vh-64px)] flex flex-col max-w-7xl mx-auto py-4 gap-4 px-4">
      {/* HEADER - Altura fija */}
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Lista de Productos</h1>

        <div className="flex items-center gap-2">
          <Button asChild  className="cursor-pointer relative">
            <Link to="../createp" className="absolute inset-0">Agregar producto</Link>
          </Button>
          <DebouncedInput
            valueDafault={tableState.globalFilter ?? ""}
            onChange={tableState.onGlobalFilterChange}
            placeholder="Buscar productos..."
          />
        </div>
      </div>

      {/* TABLA - Crece para ocupar espacio restante */}
      <div className="flex-1 min-h-0">
        <DataTable
          columns={columnsProduct()}
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
