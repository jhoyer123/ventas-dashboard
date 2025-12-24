//imports de la tabla
import { useServerTableState } from "@/components/common/tabla/useServerTableState";
import { DataTable } from "@/components/common/tabla/DataTable";
import { columnsMovement } from "./ColumnsMovement";
//importamos el hook para obtener los movimientos
import { useGetMovements } from "@/hooks/movement/useGetMovements";
import { DebouncedInput } from "@/components/common/tabla/DebouncedInput";
import { useState } from "react";
import type { Movement } from "@/types/movement";
import { ModalDetMovement } from "@/components/movement/ModalDetMovement";

const Movements = () => {
  //usamos el hook del a tabla
  const tableState = useServerTableState({});
  //usamos el hook para obtener los movimientos
  const { data, isLoading } = useGetMovements(tableState.apiParams);

  //logica para mostrar los detalles en un modal
  //estado para el modal de detalles
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(
    null
  );
  const openModal = (movement: Movement) => {
    setSelectedMovement(movement);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovement(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-2">
        <h1 className="text-2xl font-bold">Lista de Movimientos</h1>
        {/* buscador */}
        <DebouncedInput
          valueDafault={tableState.globalFilter ?? ""}
          onChange={tableState.onGlobalFilterChange}
          placeholder="Buscar movimientos..."
        />
      </div>
      {/* tabla */}
      <DataTable
        columns={columnsMovement({ openModal })}
        data={data?.data || []}
        rowCount={data?.meta.total ?? 0}
        pagination={tableState.pagination}
        setPagination={tableState.setPagination}
        sorting={tableState.sorting}
        setSorting={tableState.setSorting}
        isLoading={isLoading}
      />

      {/* modal de detalles */}
      <ModalDetMovement
        isOpen={isModalOpen}
        onClose={closeModal}
        movement={selectedMovement!}
      />
    </div>
  );
};

export default Movements;
