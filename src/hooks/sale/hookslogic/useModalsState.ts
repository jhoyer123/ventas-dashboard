import type { SaleH } from "@/types/saleh";
import React from "react";

type modal = "details" | "debtPayment" | null;

export interface typeMS {
  typeModal: modal;
  sale: SaleH | null;
}

export const useModalsState = () => {
  const [typeModal, setTypeModal] = React.useState<typeMS | null>(null);

  const handleModal = (data: typeMS) => {
    setTypeModal({ typeModal: data.typeModal, sale: data.sale });
  };

  const closeModal = () => {
    setTypeModal({ typeModal: null, sale: null });
  };

  return {
    typeModal,
    handleModal,
    closeModal,
  };
};
