import { useState } from "react";
import { toast } from "sonner";
import { isValidManualAmount } from "@/lib/pos/validators";

export const useManualAmount = (calculatedTotal: number) => {
  const [manualAmount, setManualAmount] = useState<number | "">("");
  const [isDebt, setIsDebt] = useState(false);

  const handleManualAmount = (valueI: number | "") => {
    const validation = isValidManualAmount(valueI, calculatedTotal);

    if (!validation.isValid) {
      toast.error(validation.error!, {
        position: "top-right",
        duration: 4000,
      });
      setManualAmount(calculatedTotal);
      return;
    }

    if (valueI === "") {
      setManualAmount("");
      return;
    }

    const value = Number(valueI);
    setManualAmount(Number(value.toFixed(2)));
  };

  const resetManualAmount = () => {
    setManualAmount("");
    setIsDebt(false);
  };

  return {
    manualAmount,
    setManualAmount,
    isDebt,
    setIsDebt,
    handleManualAmount,
    resetManualAmount,
  };
};
