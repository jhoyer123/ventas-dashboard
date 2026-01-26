// src/hooks/pos/useCartQuantity.ts

import { useState } from "react";
import { toast } from "sonner";
import type { CartItem, EditingQtyMap } from "@/types/salePos";
import { updateCartItemQuantity } from "@/lib/pos/cartLogic";

export const useCartQuantity = (
  cart: CartItem[],
  setCart: (cart: CartItem[]) => void,
) => {
  const [editingQty, setEditingQty] = useState<EditingQtyMap>({});

  const commitQuantity = (item: CartItem, rawValue: number) => {

    if (Number.isNaN(rawValue)) return;

    let value = rawValue ?? item.quantity;
    const result = updateCartItemQuantity(cart, item.id, value, item.stock);
    if (!result.success) {
      toast.error(result.error!, {
        position: "top-right",
        duration: 3000,
      });
      // Restaurar cantidad original
      value = item.quantity;
    } else {
      setCart(result.cart!);
    }

    // Limpiar estado de edición
    setEditingQty((prev) => {
      const copy = { ...prev };
      delete copy[item.id];
      return copy;
    });
  };

  const changeByDelta = (item: CartItem, delta: number) => {
    commitQuantity(item, item.quantity + delta);
  };

  return {
    editingQty,
    setEditingQty,
    commitQuantity,
    changeByDelta,
  };
};
