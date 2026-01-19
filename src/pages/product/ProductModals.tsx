import { AlertDelete } from "@/components/common/AlertDelet";
import { ModalBranches } from "@/components/product/ModalBranches";
import { ModalAddStock } from "@/components/product/ModalAddStock";
import { useBranch } from "@/context/BranchContext";
import type { ProductModalState } from "@/hooks/product/hooksLogic/useProductModals";
import type {
  AddStockFormValues,
  RemoveStockValues,
  TransferStockValues,
} from "@/schemes/branchProd";
import { ModalRemoveStock } from "@/components/product/ModalRemoveStock";
import { ModalTransferStock } from "@/components/product/ModalTransferStock";
import { ModalManageOffer } from "@/components/product/ModalManageOffer";
import type { OfferFormValues } from "@/schemes/product";

interface Props {
  modal: ProductModalState;
  closeModal: () => void;
  onDelete: (id: string) => void;
  onAddBranch: (data: any[], productId: string) => void;
  onAddStock: (quantity: AddStockFormValues) => void;
  onRemoveStock: (data: RemoveStockValues) => void;
  onTransferStock: (data: TransferStockValues) => void;
  onActiveOffer: (dataOffer: OfferFormValues) => void;
}

export function ProductModals({
  modal,
  closeModal,
  onDelete,
  onAddBranch,
  onAddStock,
  onRemoveStock,
  onTransferStock,
  onActiveOffer,
}: Props) {
  const { currentBranch } = useBranch();

  if (!modal.type || !modal.productId) return null;

  return (
    <>
      {modal.type === "delete" && (
        <AlertDelete
          isOpen
          title={
            !currentBranch
              ? "Eliminar Producto"
              : "Eliminar Producto de Sucursal"
          }
          description={
            !currentBranch
              ? "¿Estás seguro de eliminar el producto globalmente?, esta acción no se puede deshacer"
              : "¿Estas seguro de eliminar el producto solo de esta sucursal?, esta acción no se puede deshacer"
          }
          setOpenAlert={closeModal}
          funDelete={() => {
            onDelete(modal.productId!);
            closeModal();
          }}
        />
      )}

      {modal.type === "addBranch" && (
        <ModalBranches
          open
          productId={modal.productId}
          setOpen={closeModal}
          funParent={(data) => onAddBranch(data, modal.productId!)}
        />
      )}

      {modal.type === "addBranchStock" && (
        <ModalAddStock
          isOpen={true}
          setIsOpen={closeModal}
          onAddStock={(quantity: AddStockFormValues) => onAddStock(quantity)}
        />
      )}

      {modal.type === "remove" && (
        <ModalRemoveStock
          isOpen={true}
          setIsOpen={closeModal}
          stockCurrent={modal.stockCurrent}
          onRemoveStock={(data: RemoveStockValues) => onRemoveStock(data)}
        />
      )}

      {modal.type === "transfer" && (
        <ModalTransferStock
          isOpen={true}
          setIsOpen={closeModal}
          stockCurrent={modal.stockCurrent}
          onTransferStock={(data: TransferStockValues) => onTransferStock(data)}
        />
      )}

      {modal.type === "manageOffer" && (
        <ModalManageOffer
          isOpen={true}
          setIsOpen={closeModal}
          product={{ ...modal }}
          onActiveOffer={onActiveOffer}
        />
      )}
    </>
  );
}
