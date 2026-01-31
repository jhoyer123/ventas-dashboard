import type { CartItem, ProductPos } from "@/types/salePos";
import {
  hasAvailableStock,
  isProductInCart,
  isQuantityAvailable,
  validateOffer,
} from "@/lib/pos/validators";
import { justDate } from "@/utils/dataFormat";
/**
 * Calcula el precio final de un producto (considerando ofertas)
 */
export const calculateFinalPrice = (product: ProductPos): number => {
  return product.is_offer_active &&
    product.price_offer &&
    validateOffer(
      justDate(product.start_date),
      justDate(product.end_date),
    )
    ? product.price_offer
    : product.price;
};

/**
 * Crea un nuevo item del carrito a partir de un producto
 */
export const createCartItem = (product: ProductPos): CartItem => {
  const finalPrice = calculateFinalPrice(product);
  return {
    ...product,
    quantity: 1,
    price: finalPrice,
    subtotal: finalPrice,
  };
};

/**
 * Agrega un producto al carrito (retorna nuevo array o error)
 */
export const addProductToCart = (
  cart: CartItem[],
  product: ProductPos,
): { success: boolean; cart?: CartItem[]; error?: string } => {
  // Validar stock
  if (!hasAvailableStock(product)) {
    return {
      success: false,
      error: "No hay stock disponible de este producto",
    };
  }

  // Validar si ya existe
  if (isProductInCart(product.id, cart)) {
    return {
      success: false,
      error: "El producto ya está agregado en el carrito",
    };
  }

  // Agregar al carrito
  const newItem = createCartItem(product);
  return {
    success: true,
    cart: [...cart, newItem],
  };
};

/**
 * Remueve un producto del carrito
 */
export const removeProductFromCart = (
  cart: CartItem[],
  productId: string,
): CartItem[] => {
  return cart.filter((item) => item.id !== productId);
};

/**
 * Actualiza la cantidad de un item en el carrito
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  itemId: string,
  newQuantity: number,
  maxStock: number,
): { success: boolean; cart?: CartItem[]; error?: string } => {
  // Validar cantidad
  if (newQuantity < 1) {
    return {
      success: false,
      error: "La cantidad debe ser al menos 1",
    };
  }

  if (!isQuantityAvailable(newQuantity, maxStock)) {
    return {
      success: false,
      error: "No hay suficiente stock",
    };
  }

  // Actualizar carrito
  const updatedCart = cart.map((item) => {
    if (item.id === itemId) {
      const newSubtotal = newQuantity * item.price;
      return { ...item, quantity: newQuantity, subtotal: newSubtotal };
    }
    return item;
  });

  return {
    success: true,
    cart: updatedCart,
  };
};
