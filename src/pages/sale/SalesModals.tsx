import { ModalCancel } from "@/components/sale/ModalCancel";
import { ModalDebPay } from "@/components/sale/ModalDebPay";
import { ModalDetSale } from "@/components/sale/ModalDetSale";
import type { DebtPaymentForm } from "@/schemes/debPay";
import type { SaleH } from "@/types/saleh";

interface Props {
  type: string | null;
  sale: SaleH | null;
  closeModal: () => void;
  handlePayDebt: (formData: DebtPaymentForm) => void;
  funCancel: () => void;
}

//componente que renderiza los modales de venta segun el tipo
export const SalesModals = ({
  type,
  sale,
  closeModal,
  handlePayDebt,
  funCancel,
}: Props) => {
  return (
    <>
      {/* modal de detalles de la venta */}
      {type === "details" && (
        <ModalDetSale
          sale={sale!}
          open={type === "details"}
          closeModal={closeModal}
        />
      )}

      {/* modal de abono a la deuda */}
      {type === "debtPayment" && (
        <ModalDebPay
          open={type === "debtPayment"}
          setOpen={closeModal}
          funParent={handlePayDebt}
          debt={sale?.debtAmount || 0}
        />
      )}

      {type === "cancel" && (
        <ModalCancel
          funCancel={funCancel}
          isOpen={type === "cancel"}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
