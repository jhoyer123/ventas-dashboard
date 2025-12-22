//context de la sucursal
import { DataTable } from "@/components/common/tabla/DataTable";
import { useServerTableState } from "@/components/common/tabla/useServerTableState";
import { useBranch } from "@/context/BranchContext";
import { columnsSaleH } from "@/pages/sale/ColumnsSale";
//hook que trae las ventas realizadas
import { useGetSalesH } from "@/hooks/sale/useGetSales";
import { DebouncedInput } from "@/components/common/tabla/DebouncedInput";
//import del hook para los modales
import { useModalsState } from "@/hooks/sale/hookslogic/useModalsState";
//import de los modales
import { SalesModals } from "@/pages/sale/SalesModals";
//import del hook para el pago de deudas
import { usePayDebt } from "@/hooks/sale/usePayDebt";
import type { DebtPaymentForm } from "@/schemes/debPay";
import { toast } from "sonner";

const Sale = () => {
  //hook de la tabla
  const tableState = useServerTableState({});
  //context de sucursal
  const { currentBranch } = useBranch();
  //hook que trae las ventas realizadas
  const { data, isLoading } = useGetSalesH({
    ...tableState.apiParams,
    branchId: currentBranch || null,
  });

  //hook para los modales
  const modals = useModalsState();

  //hook para realizar abonos en deudas
  const payDebtMutation = usePayDebt();
  //funcion que maneja el pago de deuda
  const handlePayDebt = (dataForm: DebtPaymentForm) => {
    const promise = payDebtMutation.mutateAsync({
      p_sale_id: modals.typeModal?.sale?.id!,
      p_amount: dataForm.amount,
      p_payment_method: dataForm.paymentMethod!,
      p_note: dataForm.note || "",
    });
    toast.promise(promise, {
      loading: "Procesando el pago de la deuda...",
      success: "Deuda pagada con exito",
      error: "Error al procesar el pago de la deuda",
      position: "top-right",
      duration: 4000,
    });
    modals.closeModal();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-2">
        <h1 className="text-2xl font-bold ">Historial de Ventas</h1>
        <DebouncedInput
          valueDafault={tableState.globalFilter ?? ""}
          onChange={tableState.onGlobalFilterChange}
          placeholder="Buscar ventas..."
        />
      </div>
      <DataTable
        columns={columnsSaleH({ openM: modals.handleModal })}
        data={data?.data || []}
        rowCount={data?.meta.total ?? 0}
        pagination={tableState.pagination}
        setPagination={tableState.setPagination}
        sorting={tableState.sorting}
        setSorting={tableState.setSorting}
        isLoading={isLoading}
      />

      {/* Modales */}
      <SalesModals
        type={modals.typeModal?.typeModal || null}
        sale={modals.typeModal?.sale || null}
        closeModal={modals.closeModal}
        handlePayDebt={handlePayDebt}
      />
    </div>
  );
};

export default Sale;
