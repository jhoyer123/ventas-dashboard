import { Minus, Package, Plus, ShoppingCart, Trash2 } from "lucide-react";
//types para el pos y la venta
import type { CartItem } from "@/types/salePos";

interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  changeByDelta: (item: CartItem, delta: number) => void;
  removeFromCart: (productId: string) => void;
  editingQty: Record<string, string>;
  setEditingQty: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  commitQuantity: (item: CartItem, rawValue: number) => void;
  totals: {
    subtotal: number;
    tax: number;
    calculatedTotal: number;
    finalAmount: number;
    difference: number;
  };
  manualAmount: number | "";
  setManualAmount: React.Dispatch<React.SetStateAction<number | "">>;
  isDebt: boolean;
  setIsDebt: React.Dispatch<React.SetStateAction<boolean>>;
  handleManualAmount: (valueI: number | "") => void;
  openModal: () => void;
}

export const AsidePos = ({
  cart,
  setCart,
  changeByDelta,
  removeFromCart,
  editingQty,
  setEditingQty,
  commitQuantity,
  setIsDebt,
  setManualAmount,
  openModal,
}: Props) => {
  return (
    <aside className="hidden relative lg:flex w-[420px] bg-white border-l border-slate-200 flex-col shadow-xl">
      <div className="px-2 py-2.5 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-black flex items-center gap-2">
          <ShoppingCart className="text-indigo-600" size={24} /> Venta
        </h2>
        <button
          onClick={() => {
            setCart([]);
            setManualAmount("");
            setIsDebt(false);
          }}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-1 space-y-3">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-6">
            <Package size={64} strokeWidth={1} className="mb-4 opacity-10" />
            <p className="text-sm font-bold italic">El carrito está vacío</p>
          </div>
        ) : (
          cart.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-2 py-1.5 bg-slate-50 rounded-2xl border border-slate-100 group"
            >
              <div>{i + 1}</div>
              <div className="size-12 rounded-lg overflow-hidden border border-slate-200 bg-white">
                <img
                  src={item.main_image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">
                  {item.name_prod}
                </h4>
                <p className="text-xs text-indigo-600 font-bold">
                  Precio: $
                  {item.is_offer_active ? item.price_offer : item.price}
                </p>
                <h4 className="text-xs text-indigo-600 font-bold">
                  Subtotal: ${item.subtotal.toFixed(2)}
                </h4>
              </div>
              <div className="flex flex-col items-center bg-white border border-slate-200 rounded-lg pb-1">
                <div>
                  <span className="text-[13px] font-semibold">Cantidad</span>
                </div>
                <div>
                  <button
                    onClick={() => changeByDelta(item, -1)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-500"
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    value={editingQty[item.id] ?? item.quantity}
                    onChange={(e) =>
                      setEditingQty((prev: { [key: string]: string }) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    onBlur={() =>
                      commitQuantity(item, Number(editingQty[item.id]))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.currentTarget.blur();
                      }
                    }}
                    className="w-14 text-center font-bold border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => changeByDelta(item, 1)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-500"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
      {/* Botón Finalizar */}
      <button
        onClick={openModal}
        disabled={cart.length === 0}
        className={`w-[90%] py-2 bg-black text-white my-2 mx-auto rounded-lg  ${
          cart.length === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-102 cursor-pointer"
        } duration-300 transition-all text-2xl font-title`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Finalizar Venta
        </span>
      </button>
    </aside>
  );
};
