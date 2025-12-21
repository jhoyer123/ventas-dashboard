import type { CartItem, EditingQtyMap, ProductPos } from "@/pages/sale/Sale";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const useCart = () => {
  //ESTADO DEL CARRITO
  const [cart, setCart] = useState<CartItem[]>([]);

  //ESTADOS PARA EL MANEJO DE TOTALES Y MONTOS MANUALES
  const [manualAmount, setManualAmount] = useState<number | "">("");
  const [isDebt, setIsDebt] = useState(false); // Checkbox: false = Descuento, true = Deuda

  //LÓGICA DEL CARRITO UN PRODUCTO
  const addToCart = (product: ProductPos) => {
    if (product.stock <= 0)
      return toast.error("No hay stock disponible de este producto.", {
        position: "top-right",
        duration: 4000,
      });
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      return toast.error("El producto ya está agregado en el carrito.", {
        position: "top-right",
        duration: 4000,
      });
    }
    setCart((prev) => {
      const finalPrice = product.is_offer_active
        ? product.price_offer!
        : product.price;
      return [
        ...prev,
        { ...product, quantity: 1, price: finalPrice, subtotal: finalPrice },
      ];
    });
  };

  //LOGICA PARA CAMBIAR CANTIDADES EN EL CARRITO
  const [editingQty, setEditingQty] = useState<EditingQtyMap>({});
  //cambia la cantidad
  const commitQuantity = (item: CartItem, rawValue: number) => {
    let value = rawValue;
    if (!value || value < 1) {
      value = item.quantity;
    }
    if (value > item.stock) {
      toast.error("No hay suficiente stock", {
        position: "top-right",
        duration: 3000,
      });
      value = item.quantity;
    }
    setCart((prev) =>
      prev.map((p) =>
        p.id === item.id
          ? { ...p, quantity: value, subtotal: value * p.price }
          : p
      )
    );
    setEditingQty((prev) => {
      const copy = { ...prev };
      delete copy[item.id];
      return copy;
    });
  };

  //aumenta o disminuye la cantidad en 1
  const changeByDelta = (item: CartItem, delta: number) => {
    commitQuantity(item, item.quantity + delta);
  };

  //remueve un producto del carrito
  const removeFromCart = (id: string) => {
    if (cart.length === 1) {
      setManualAmount("");
      setIsDebt(false);
    }
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //TOTALES
  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
    const tax = subtotal * 0.13;
    const calculatedTotal = subtotal; // El "1000" de tu ejemplo

    // Si el vendedor puso un monto manual (ej. 980), ese es el finalAmount.
    // Si no puso nada, el finalAmount es el calculado.
    const finalAmount =
      manualAmount !== "" ? Number(manualAmount) : calculatedTotal;

    // La diferencia (ej. 20)
    const difference = Math.max(0, calculatedTotal - finalAmount);

    return {
      subtotal,
      tax,
      calculatedTotal,
      finalAmount,
      difference, // Este valor irá a discountAmount o debt_amount según el checkbox
    };
  }, [cart, manualAmount]);

  //funcion para controlar el valor del monto manual (monto cobrado)
  const handleManualAmount = (valueI: number | "") => {
    if (valueI === "") {
      setManualAmount("");
      return;
    }

    const value = Number(valueI);

    if (value <= 0) {
      setManualAmount("");
      return;
    }

    if (value > totals.calculatedTotal) {
      toast.error("El monto cobrado no puede ser mayor al total a cobrar.", {
        position: "top-right",
        duration: 4000,
      });
      setManualAmount(totals.calculatedTotal);
      return;
    }

    setManualAmount(value.toFixed(2) as unknown as number);
  };

  return {
    cart,
    setCart,
    addToCart,
    editingQty,
    setEditingQty,
    commitQuantity,
    changeByDelta,
    removeFromCart,
    totals,
    manualAmount,
    setManualAmount,
    isDebt,
    setIsDebt,
    handleManualAmount,
  };
};
