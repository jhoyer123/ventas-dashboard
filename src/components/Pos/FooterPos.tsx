import type { CartItem, Totals } from "@/pages/Pos/Pos";
import React from "react";

interface Props {
  cart: CartItem[];
  totals: Totals;
  manualAmount: number | "";
  setManualAmount: React.Dispatch<React.SetStateAction<number | "">>;
  isDebt: boolean;
  setIsDebt: React.Dispatch<React.SetStateAction<boolean>>;
  handleManualAmount: (valueI: number | "") => void;
  openModal?: () => void;
}

export const FooterPos = ({
  cart,
  totals,
  manualAmount,
  setManualAmount,
  isDebt,
  setIsDebt,
  handleManualAmount,
  openModal,
}: Props) => {
  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-slate-200 border-t border-slate-200
    "
    >
      <div className="flex gap-8">
        {/* boton de finalizar venta */}
        <button
          onClick={openModal}
          disabled={cart.length === 0}
          className="w-full cursor-pointer bg-slate-900 text-white px-10 rounded-2xl font-bold text-lg hover:bg-slate-700 transition-all shadow-xl active:scale-95 disabled:bg-slate-300"
        >
          Finalizar Venta
        </button>
        {/* Total Final Visual */}
        <div className="flex flex-col justify-center items-start border-t border-slate-200">
          <span className="font-bold text-slate-900">A Cobrar</span>
          <span className="text-3xl font-black text-slate-900">
            Bs.{totals.calculatedTotal.toFixed(2)}
          </span>
        </div>
      </div>
      {/* parte manual */}
      <div className="flex gap-4">
        {/* Input Monto Real */}
        <div className="flex flex-col px-6 py-1 justify-between items-center bg-blue-600  text-white border border-slate-200 rounded-xl">
          <span className="text-sm font-bold text-slate-300">
            Monto Cobrado:
          </span>
          <div className="relative w-32">
            <span className="absolute left-2 top-1/2 -translate-y-1/2">
              Bs.
            </span>
            <input
              disabled={cart.length === 0}
              type="number"
              min={1}
              placeholder={totals.calculatedTotal.toFixed(2).toString()}
              value={manualAmount}
              onChange={(e) =>
                setManualAmount(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              onBlur={() => handleManualAmount(manualAmount)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.currentTarget.blur();
                }
              }}
              className="w-full pl-5 pr-2 py-1 text-right font-black outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Checkbox Deuda vs Descuento */}
        {totals.difference > 0 && (
          <div className="flex gap-4 items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDebt"
                checked={isDebt}
                onChange={(e) => setIsDebt(e.target.checked)}
                className="size-4 accent-indigo-600"
              />
              <label
                htmlFor="isDebt"
                className="text-xs font-bold text-slate-600 cursor-pointer"
              >
                ¿Registrar diferencia como DEUDA?
              </label>
            </div>
            <span className="text-xs font-black text-rose-500">
              -Bs.{totals.difference.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
