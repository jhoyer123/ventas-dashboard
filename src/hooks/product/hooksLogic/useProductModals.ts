import { useState } from "react";

export type ProductModalState =
  | { type: null }
  | { type: "delete"; productId: string }
  | { type: "addBranch"; productId: string }
  | { type: "addBranchStock"; productId: string }
  | { type: "transfer"; productId: string; stockCurrent: number }
  | { type: "remove"; productId: string; stockCurrent: number }
  | {
      type: "manageOffer";
      productId: string;
      nameProd: string;
      price: number;
      priceOffer?: number;
      isOfferActive: boolean;
      startDate?: string;
      endDate?: string;
    };

export const useProductModals = () => {
  const [modal, setModal] = useState<ProductModalState>({ type: null });

  const openModal = (modal: ProductModalState) => {
    setModal(modal);
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
