import { DataTable } from "../../components/common/tabla/DataTable";
import { DebouncedInput } from "../../components/common/tabla/DebouncedInput";
import { Button } from "@/components/ui/button";
import { useServerTableState } from "../../components/common/tabla/useServerTableState";
//context de la sucursal
import { useBranch } from "../../context/BranchContext";
//hook para obtener productos
import useGetprodut from "@/hooks/product/useGetProduct";
//hook para eliminar producto simulado - soft delete de manera global
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct";
//hook para eliminar producto de una sucursal especifica
import { useDeleteProductE } from "@/hooks/product/useDeleteProductE";
//columnas de la tabla
import { columnsProduct } from "./ColumnsProduct";
import { Link } from "react-router-dom";
import { AlertDelete } from "@/components/common/AlertDelet";
import { useState } from "react";
import { toast } from "sonner";
import { ModalBranches } from "@/components/product/ModalBranches";

export default function Product() {
  //logica de la tabla
  const tableState = useServerTableState({});

  //usamos el contexto de sucursal
  const { currentBranch } = useBranch();

  //obtenemos los productos segun el estado de la tabla y la sucursal actual
  const { data, isLoading } = useGetprodut(tableState, currentBranch);

  //logica de eliminar producto
  const [openAlert, setOpenAlert] = useState(false);
  const [idProd, setIdProd] = useState<string | null>(null);

  const handleOpenAlert = (id: string) => {
    setIdProd(id);
    setOpenAlert(!openAlert);
  };

  //logica de elimnacion con condicion o es global o es especifica
  const deleteProd = useDeleteProduct();
  const deleteProdE = useDeleteProductE();

  const handleDelete = () => {
    if (!idProd) return;

    const promise = currentBranch
      ? deleteProdE.mutateAsync({
          id: idProd as string,
          branchId: currentBranch,
        })
      : deleteProd.mutateAsync(idProd as string);
    toast.promise(promise, {
      loading: "Eliminando producto...",
      success: currentBranch
        ? "Producto eliminado de la sucursal correctamente"
        : "Producto eliminado globalmente correctamente",
      error: (err) => {
        if (!currentBranch) {
          return err.message || "Error al eliminar el producto";
        } else {
          return err.message || "Error al eliminar el producto de la sucursal";
        }
      },
      position: "top-right",
      duration: 4000,
    });
    setIdProd(null);
    setOpenAlert(false);
  };

  //logica para el modal de agregar a sucursal/es
  const [openBranches, setOpenBranches] = useState(false);

  return (
    // calcular alture - 64px del header
    <div className="h-[calc(100vh-64px)] flex flex-col max-w-7xl mx-auto py-4 gap-4 px-4">
      {/* HEADER - Altura fija */}
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Lista de Productos</h1>

        <div className="flex items-center gap-2">
          {!currentBranch && (
            <Button asChild className="cursor-pointer relative">
              <Link to="../createp" className="absolute inset-0">
                Agregar producto
              </Link>
            </Button>
          )}
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
          columns={columnsProduct({
            setOpenDelete: handleOpenAlert,
            setOpenM: () => setOpenBranches(!openBranches),
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

      {/* modal de alert para eliminar producto */}
      <AlertDelete
        title="Eliminar Producto"
        description="¿Estás seguro de que deseas eliminar este producto de forma global de todas las sucursales? Esta acción no se puede deshacer."
        isOpen={openAlert}
        setOpenAlert={() => {
          setOpenAlert(!openAlert);
          setIdProd(null);
        }}
        funDelete={handleDelete}
      />

      {/* Modal para Agregar a sucursal/es */}
      <ModalBranches
        open={openBranches}
        setOpen={() => setOpenBranches(!openBranches)}
      />
    </div>
  );
}
