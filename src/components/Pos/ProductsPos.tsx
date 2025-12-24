//types para el pos y la venta
import type { ProductPos } from "@/types/salePos";
import { Loader2, Plus } from "lucide-react";

interface Props {
  addToCart: (product: ProductPos) => void;
  products: ProductPos[];
  isPending: boolean;
  loadMore: () => void;
  getAvailableStock: (productId: string) => number;
}

export const ProductsPos = ({
  products,
  addToCart,
  isPending,
  //loadMore,
  getAvailableStock,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
      {isPending && products.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-slate-400">
          <Loader2 className="animate-spin mr-2" /> Cargando catálogo...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => addToCart(prod)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col group"
            >
              <div className="aspect-square bg-slate-50 relative overflow-hidden">
                <img
                  src={prod.main_image || "/placeholder.png"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={prod.name_prod}
                />
                {prod.is_offer_active && (
                  <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">
                    OFERTA
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold border border-slate-200">
                  Stock: {getAvailableStock(prod.id)}
                </div>
                <div className="absolute top-0 w-full px-1 mt-1 flex items-center justify-between">
                  <div>
                    {prod.is_offer_active && (
                      <p className="text-[10px] text-slate-400 line-through">
                        ${prod.price}
                      </p>
                    )}
                    <p className="text-base font-black text-white bg-black px-1 rounded shadow-md">
                      ${prod.is_offer_active ? prod.price_offer : prod.price}
                    </p>
                  </div>
                  <div className="opacity-0  group-hover:opacity-100 size-8 rounded-lg flex items-center justify-center text-white bg-indigo-600 transition-colors">
                    <Plus size={18} />
                  </div>
                </div>
              </div>

              <div className="p-2 flex flex-col flex-1">
                <span className="text-[10px] text-slate-900 font-mono">
                  {prod.sku || "SIN SKU"}
                </span>
                <h3 className="text-sm font-bold text-slate-700 line-clamp-2 mt-0.5 flex-1">
                  {prod.name_prod}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <button
        onClick={() => loadMore()}
        disabled={isPending}
        className="mt-8 mx-auto flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
      >
        {isPending && <Loader2 className="animate-spin size-4" />}
        Cargar más productos
      </button> */}
    </div>
  );
};
