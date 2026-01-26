// src/hooks/pos/useCart.ts

import { useState } from "react";
import { toast } from "sonner";
import type { CartItem, ProductPos } from "@/types/salePos";
import { addProductToCart, removeProductFromCart } from "@/lib/pos/cartLogic";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: ProductPos) => {
    const result = addProductToCart(cart, product);

    if (!result.success) {
      toast.error(result.error!, {
        position: "top-right",
        duration: 4000,
      });
      return;
    }

    setCart(result.cart!);
  };

  const removeFromCart = (id: string) => {
    const newCart = removeProductFromCart(cart, id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    setCart,
  };
};
