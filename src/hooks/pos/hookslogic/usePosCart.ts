import { useEffect, useState } from "react";
import { useCart } from "./useCart";
import { useCartQuantity } from "./useCartQuantity";
import { useCartTotals } from "./useCartTotals";
import { useManualAmount } from "./useManualAmount";

/**
 * Hook principal que combina toda la funcionalidad del carrito POS
 * Sigue el patrón Facade para simplificar el uso
 */
export const usePosCart = () => {
  // 1. Carrito básico
  const { cart, addToCart, removeFromCart, clearCart, setCart } = useCart();

  // 2. Totales
  const [manualAmountValue, setManualAmountValue] = useState<number | "">("");
  const totals = useCartTotals(cart, manualAmountValue);

  // 3. Monto manual
  const {
    manualAmount,
    setManualAmount,
    isDebt,
    setIsDebt,
    handleManualAmount,
    resetManualAmount,
  } = useManualAmount(totals.calculatedTotal);

  // Sincronizar manualAmount con el usado en totals
  useEffect(() => {
    setManualAmountValue(manualAmount);
  }, [manualAmount]);

  // 4. Cantidades
  const { editingQty, setEditingQty, commitQuantity, changeByDelta } =
    useCartQuantity(cart, setCart);

  return {
    // Estado del carrito
    cart,

    // Acciones del carrito
    addToCart,
    removeFromCart: (id: string) => {
      removeFromCart(id);
      if (cart.length === 1) {
        resetManualAmount();
      }
    },
    clearCart,

    // Edición de cantidades
    editingQty,
    setEditingQty,
    commitQuantity,
    changeByDelta,

    // Totales
    totals,

    // Monto manual
    manualAmount,
    setManualAmount,
    isDebt,
    setIsDebt,
    handleManualAmount,
  };
};
