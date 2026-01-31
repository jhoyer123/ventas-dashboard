import type { CartItem, ProductPos } from "@/types/salePos";

/**
 * Valida si un producto tiene stock disponible
 */
export const hasAvailableStock = (product: ProductPos): boolean => {
  return product.stock > 0;
};

/**
 * Valida si la cantidad solicitada está disponible en stock
 */
export const isQuantityAvailable = (
  requestedQty: number,
  availableStock: number,
): boolean => {
  return requestedQty <= availableStock;
};

/**
 * Valida si un producto ya existe en el carrito
 */
export const isProductInCart = (
  productId: string,
  cart: CartItem[],
): boolean => {
  return cart.some((item) => item.id === productId);
};

/**
 * Valida si el monto manual es válido
 */
export const isValidManualAmount = (
  amount: number | "",
  calculatedTotal: number,
): { isValid: boolean; error?: string } => {
  if (amount === "") {
    return { isValid: true };
  }

  const numAmount = Number(amount);

  if (numAmount <= 0) {
    return { isValid: false, error: "El monto debe ser mayor a 0" };
  }

  if (numAmount > calculatedTotal) {
    return {
      isValid: false,
      error: "El monto cobrado no puede ser mayor al total a cobrar",
    };
  }

  return { isValid: true };
};

/**
 * Validar si una oferta está activa según las fechas
 */
export const validateOffer = (
  startDate: string | null,
  endDate: string | null,
): boolean => {
  const today = new Date().toISOString().split("T")[0];
  if (!startDate || !endDate) {
    return false;
  }

  if (today >= startDate && today <= endDate) {
    return true;
  }

  return false;
};
