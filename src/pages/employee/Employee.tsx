import { DataTable } from "../../components/common/tabla/DataTable";
import { DebouncedInput } from "../../components/common/tabla/DebouncedInput";
import { Button } from "@/components/ui/button";
import { columnsPersonal } from "./columnsEmployee";
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
//context de branch

export default function PersonalPage() {
  //logica de la tabla
  const tableState = useServerTableState({});
  const { currentBranch } = useBranch();
  const { data, isLoading } = useGetEmployee(tableState, currentBranch || null);
  //estado para contorlar el form de solo lectura
  const [disableMod, setDesableMod] = useState(false);
  //logica para crear y actualizar el empleado
  const create = useCreateEmployee();
  const update = useUpdateEmployee();
  //logica para el empleado seleccionado
  const [empSelected, setEmpSelected] = useState<Employee | undefined>(
    undefined
  );

  //logica del modal
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  //funcion para el submit del formulario
  const handleSubmit = (dataEmp: FormEmployeeInput) => {
    const promise = empSelected
      ? update.mutateAsync({ id: empSelected.id, dataEmployee: dataEmp })
      : create.mutateAsync(dataEmp);

    toast.promise(promise, {
      loading: empSelected ? "Actualizando empleado..." : "Creando empleado...",
      success: empSelected
        ? "Empleado actualizado con éxito"
        : "Empleado creado con éxito",
      error: empSelected
        ? "Error al actualizar el empleado"
        : "Error al crear el empleado",
      position: "top-right",
      duration: 3500,
    });

    handleOpen();
  };

  //funcion para abrir el modal desde el boton de editar
  const openEditModal = (empSelected: Employee) => {
    setDesableMod(false);
    setEmpSelected(empSelected);
    handleOpen();
  };

  //funcion para abrir el modal desde el boton de ver
  const openViewModal = (empSelected: Employee, disable: boolean) => {
    setEmpSelected(empSelected);
    setDesableMod(disable);
    handleOpen();
  };
  //logica para el modal de eliminacion
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  };
  const openDeleteAlert = (empSelected: Employee) => {
    setEmpSelected(empSelected);
    handleOpenDelete();
  };
  //Logica de eliminacion del empleado
  const deleteE = useDeleteEmployee();
  //funcion para eliminar empleado
  const handleDeleteEmployee = () => {
    const promise = deleteE.mutateAsync(empSelected?.id || "");
    toast.promise(promise, {
      loading: "Eliminando empleado...",
      success: "Empleado eliminado con éxito",
      error: "Error al eliminar el empleado",
      position: "top-right",
      duration: 3500,
    });
  };

  return (
    // calcular alture - 64px del header
    <div className="h-[calc(100vh-64px)] flex flex-col max-w-7xl mx-auto py-4 gap-4 px-4">
      {/* HEADER - Altura fija */}
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">
          Lista de Empleados
          <span className="text-sm font-normal text-gray-500 block">
            Sin acceso al sistema
          </span>
        </h1>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setEmpSelected(undefined);
              setDesableMod(false);
              handleOpen();
            }}
            className="cursor-pointer"
          >
            Agregar Empleado
          </Button>
          <DebouncedInput
            valueDafault={tableState.globalFilter ?? ""}
            onChange={tableState.onGlobalFilterChange}
            placeholder="Buscar empleados..."
          />
        </div>
      </div>

      {/* TABLA - Crece para ocupar espacio restante */}
      <div className="flex-1 min-h-0">
        <DataTable
          columns={columnsPersonal({
            setOpenEdit: openEditModal,
            setOpenView: openViewModal,
            setOpenDelete: openDeleteAlert,
          })}
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
      <ModalEmployee
        isOpen={isOpen}
        setOpen={handleOpen}
        onSubmit={handleSubmit}
        initialValues={empSelected}
        branchIdC={currentBranch || undefined}
        isViewMode={disableMod}
      />

      {/* modal de eliminacion */}
      <AlertDelete
        title="Eliminar empleado"
        description="El empleado se eliminará permanentemente. ¿Estás seguro de que deseas continuar?"
        isOpen={isOpenDelete}
        setOpenAlert={handleOpenDelete}
        funDelete={handleDeleteEmployee}
      />
    </div>
  );
}
