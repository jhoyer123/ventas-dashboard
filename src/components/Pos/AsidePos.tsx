import {
  CircleX,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
//types para el pos y la venta
import type { CartItem } from "@/types/salePos";
import styles from "./styles.module.css";

interface Props {
  cart: CartItem[];
  clearCart: () => void;
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
  isOpenShopping: boolean;
  setIsOpenShopping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AsidePos = ({
  cart,
  clearCart,
  changeByDelta,
  removeFromCart,
  editingQty,
  setEditingQty,
  commitQuantity,
  setIsDebt,
  setManualAmount,
  openModal,
  isOpenShopping,
  setIsOpenShopping,
}: Props) => {
  return (
    <aside
      className={`
    ${styles.saleCartContent} 
    ${isOpenShopping ? "flex" : "hidden"} lg:flex 
  `}
    >
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <div className="px-2 py-2.5 border-b border-border flex justify-between items-center">
          <button
            onClick={() => setIsOpenShopping(!isOpenShopping)}
            className="lg:hidden"
          >
            <CircleX className="text-card-foreground" size={24} />
          </button>
          <h2 className="text-xl font-black flex items-center gap-2">
            <ShoppingCart className="text-brand" size={24} />
            <span>Venta</span>
          </h2>
          <button
            onClick={() => {
              clearCart();
              setManualAmount("");
              setIsDebt(false);
            }}
            className="text-destructive hover:text-destructive transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-1 space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-6">
              <Package size={64} strokeWidth={1} className="mb-4 opacity-10" />
              <p className="text-sm font-bold italic">El carrito está vacío</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={`section-car-item-pos-${item.id}`}
                className="flex flex-col items-center justify-center w-full gap-3 px-2 py-1.5 rounded-2xl border border-border group bg-ring/10"
              >
                <div className="flex w-full gap-2 items-center">
                  <div>{i + 1}</div>
                  <div className="size-15 rounded-lg overflow-hidden border">
                    <img
                      src={item.main_image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-card-foreground truncate text-wrap">
                      {item.name_prod}
                    </h4>
                    <h5 className="text-sm text-card-foreground font-semibold font-body">
                      Precio: $
                      {item.is_offer_active ? item.price_offer : item.price}
                    </h5>
                  </div>
                </div>

                <div className="flex justify-between w-full items-center pl-5 pr-2">
                  <div
                    className="flex gap-2 items-center bg-background border border-border rounded-lg py-1 px-2
                  lg:gap-4"
                  >
                    <h5 className="text-sm text-card-foreground font-semibold font-body">
                      ${item.subtotal.toFixed(2)}
                    </h5>
                    <div
                      className="flex gap-1 items-center
                    lg:gap-3"
                    >
                      <button
                        onClick={() => changeByDelta(item, -1)}
                        className="p-1 bg-secondary text-secondary-foreground rounded-full cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        value={editingQty[item.id] ?? item.quantity}
                        /* onChange={(e) =>
                          setEditingQty((prev: { [key: string]: string }) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        } */
                        onChange={(e) => {
                          const raw = e.target.value;

                          // permitir vacío mientras escribe
                          if (raw === "") {
                            setEditingQty((prev) => ({
                              ...prev,
                              [item.id]: "",
                            }));
                            return;
                          }

                          // solo dígitos
                          if (!/^\d+$/.test(raw)) return;

                          // bloquear ceros a la izquierda (excepto "0")
                          if (raw.length > 1 && raw.startsWith("0")) return;

                          setEditingQty((prev) => ({
                            ...prev,
                            [item.id]: raw,
                          }));
                        }}
                        onBlur={() => {
                          const raw = editingQty[item.id];

                          if (!raw) {
                            setEditingQty((prev) => {
                              const copy = { ...prev };
                              delete copy[item.id];
                              return copy;
                            });
                            return;
                          }

                          commitQuantity(item, Number(raw));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.currentTarget.blur();
                          }
                        }}
                        className="w-19 text-center font-body border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => changeByDelta(item, 1)}
                        className="p-1 bg-primary text-primary-foreground rounded-full cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-btn-cancel cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botón venta */}
      <button
        onClick={openModal}
        disabled={cart.length === 0}
        className={`w-auto mx-2 my-1 py-2 bg-btn-process text-btn-process-foreground rounded-lg  ${
          cart.length === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-102 cursor-pointer"
        } duration-300 transition-all text-xl font-title`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Procesar Venta
        </span>
      </button>
    </aside>
  );
};
