import type { CartItem, Totals } from "@/types/salePos";

const TAX_RATE = 0.13;

/**
 * Calcula el subtotal de todos los items del carrito
 */
const calculateSutotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + item.subtotal, 0);
};

/**
 * Calcula el impuesto basado en el subtotal
 */
export const calculateTax = (subtotal: number): number => {
  return subtotal * TAX_RATE;
};

/**
 * Calcula todos los totales del carrito
 */
export const calculateTotals = (
  items: CartItem[],
  manualAmount: number | "",
): Totals => {
  const subtotal = calculateSutotal(items);
  const tax = calculateTax(subtotal);
  const calculatedTotal = subtotal;
  // Si el vendedor puso un monto manual (ej. 980), ese es el finalAmount.
  // Si no puso nada, el finalAmount es el calculado.
  const finalAmount =
    manualAmount !== "" ? Number(manualAmount) : calculatedTotal;
  // La diferencia
  const difference = Math.max(0, calculatedTotal - finalAmount);

  return {
    subtotal,
    tax,
    calculatedTotal,
    finalAmount,
    difference, // Este valor irá a discountAmount o debt_amount según el checkbox
  };
};
