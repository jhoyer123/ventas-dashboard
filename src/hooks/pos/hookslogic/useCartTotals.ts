// src/hooks/pos/useCartTotals.ts

import { useMemo } from "react";
import type { CartItem } from "@/types/salePos";
import { calculateTotals } from "@/lib/pos/totalsCalculator";

export const useCartTotals = (cart: CartItem[], manualAmount: number | "") => {
  const totals = useMemo(() => {
    return calculateTotals(cart, manualAmount);
  }, [cart, manualAmount]);

  return totals;
};
