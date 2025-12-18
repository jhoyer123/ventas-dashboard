import { useState } from "react";

export type ProductModalType =
  | "delete"
  | "addBranch"
  | "transfer"
  | "remove"
  | "addBranchStock"
  | null;

interface ModalState {
  type: ProductModalType;
  productId?: string;
  stockCurrent?: number;
}

export const useProductModals = () => {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (
    type: ProductModalType,
    productId: string,
    stockCurrent?: number
  ) => {
    setModal({ type, productId, stockCurrent });
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  return {
    modal,
    openModal,
    closeModal,
  };
};
