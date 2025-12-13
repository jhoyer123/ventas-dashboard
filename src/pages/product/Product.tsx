import { DataTable } from "../../components/common/tabla/DataTable";
import { DebouncedInput } from "../../components/common/tabla/DebouncedInput";
import { Button } from "@/components/ui/button";
//import { columnsPersonal } from "./columnsEmployee";
import useGetEmployee from "../../hooks/employee/useGetEmployee";
// Importamos el nuevo Hook
import { useServerTableState } from "../../components/common/tabla/useServerTableState";
//context de la sucursal
import { useBranch } from "../../context/BranchContext";
import { ModalEmployee } from "@/components/Eployee/ModalEmployee";
import { useState } from "react";
//tipo para el formulario de empleado
import { type Employee, type FormEmployeeInput } from "@/types/employee";
//importar el hook de creacion de empleado
import { useCreateEmployee } from "@/hooks/employee/useCreateEmployee";
import { toast } from "sonner";
import { useUpdateEmployee } from "@/hooks/employee/useUpdateEmployee";
import { useDeleteEmployee } from "@/hooks/employee/useDeleteEmployee";
import { AlertDelete } from "@/components/common/AlertDelet";
import useGetprodut from "@/hooks/product/useGetProduct";
import { columnsProduct } from "./ColumnsProduct";
import { Link } from "react-router-dom";
//context de branch

export default function Product() {
  //logica de la tabla
  const tableState = useServerTableState({});

  //usamos el contexto de sucursal
  const { currentBranch } = useBranch();

  const { data, isLoading } = useGetprodut(tableState, currentBranch);
  //console.log("data products:", data);

  return (
    // calcular alture - 64px del header
    <div className="h-[calc(100vh-64px)] flex flex-col max-w-7xl mx-auto py-4 gap-4 px-4">
      {/* HEADER - Altura fija */}
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Lista de Productos</h1>

        <div className="flex items-center gap-2">
          <Button className="cursor-pointer">
            <Link to="../createp">Agregar producto</Link>
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

      {/* Renderizar Modal de acciones */}
      {/* <ModalEmployee
        isOpen={isOpen}
        setOpen={handleOpen}
        onSubmit={handleSubmit}
        initialValues={empSelected}
        branchIdC={currentBranch || undefined}
        isViewMode={disableMod}
      /> */}

      {/* modal de eliminacion */}
      {/* <AlertDelete
        title="Eliminar empleado"
        description="El empleado se eliminará permanentemente. ¿Estás seguro de que deseas continuar?"
        isOpen={isOpenDelete}
        setOpenAlert={handleOpenDelete}
        funDelete={handleDeleteEmployee}
      /> */}
    </div>
  );
}
