//types para el pos y la venta
import type { CartItem, Totals } from "@/types/salePos";
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
    <div className="w-full bg-white border-t border-slate-200 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] p-4 md:p-6 sticky bottom-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        {/* SECCIÓN IZQUIERDA: Input Manual y Lógica de Deuda */}
        <div className="w-full md:w-auto flex flex-col gap-3">
          {/* Input Group */}
          <div className="flex flex-col gap-1.5 w-full md:w-64">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
              Monto Recibido
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-400 font-bold">Bs.</span>
              </div>
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
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-slate-900 focus:bg-white focus:border-transparent transition-all outline-none disabled:bg-slate-100 disabled:text-slate-400 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Checkbox Deuda (Condicional) */}
          {totals.difference > 0 && (
            <div className="flex items-center gap-3 px-3 py-2 bg-rose-50 border border-rose-100 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <input
                type="checkbox"
                id="isDebt"
                checked={isDebt}
                onChange={(e) => setIsDebt(e.target.checked)}
                className="w-4 h-4 text-slate-900 border-rose-300 rounded focus:ring-rose-500 cursor-pointer accent-slate-900"
              />
              <div className="flex flex-col leading-tight">
                <label
                  htmlFor="isDebt"
                  className="text-xs font-bold text-slate-700 cursor-pointer select-none"
                >
                  Registrar como deuda
                </label>
                <span className="text-xs font-black text-rose-600">
                  Faltante: -Bs.{totals.difference.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SECCIÓN DERECHA: Totales y Botón de Acción */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          {/* Visualizador de Total */}
          <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between w-full md:w-auto gap-2 md:gap-0">
            <span className="text-sm font-medium text-slate-500">
              Total a Cobrar
            </span>
            <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              <span className="text-lg md:text-2xl font-bold text-slate-400 mr-1">
                Bs.
              </span>
              {totals.calculatedTotal.toFixed(2)}
            </span>
          </div>

          {/* Separador vertical solo en desktop */}
          <div className="hidden md:block w-px h-12 bg-slate-200"></div>

          {/* Botón Finalizar */}
          <button
            onClick={openModal}
            disabled={cart.length === 0}
            className="group relative w-full md:w-auto min-w-[200px] bg-slate-900 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Finalizar Venta
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
