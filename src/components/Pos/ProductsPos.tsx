//types para el pos y la venta
import type { ProductPos } from "@/types/salePos";
import { Loader2, Plus } from "lucide-react";
import styles from "@/components/Pos/styles.module.css";

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
  getAvailableStock,
}: Props) => {
  return (
    <div
      className="flex-1 max-h-full h-full w-full pt-3 px-2 mb-13
    md:mb-3 overflow-y-auto
    xl:px-10"
    >
      {isPending && products.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" /> Cargando catálogo...
        </div>
      ) : (
        <div className={styles.container}>
          <div className={`${styles.productsContent} gap-1.5`}>
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-bran hover:shadow-xl hover:shadow-ring/10 transition-all group flex flex-col group"
              >
                <div className="aspect-square bg-card relative overflow-hidden">
                  <img
                    src={prod.main_image || "/placeholder.png"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={prod.name_prod}
                  />
                  <div className="absolute bottom-2 right-2 bg-accent backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold border border-border">
                    Stock: {getAvailableStock(prod.id)}
                  </div>
                  <div className="absolute top-0 w-full px-1 mt-1 flex items-center justify-between">
                    <div className="bg-black text-white rounded-md">
                      {prod.is_offer_active && (
                        <p className="text-sm line-through">
                          ${prod.price}
                        </p>
                      )}
                      <p className="text-base font-black text-accent bg-accent-foreground px-1 rounded shadow-sm">
                        ${prod.is_offer_active ? prod.price_offer : prod.price}
                      </p>
                    </div>
                    <div
                      onClick={() => addToCart(prod)}
                      className="lg:opacity-0 group-hover:opacity-100 size-8 rounded-lg flex items-center justify-center text-brand-foreground font-bold bg-brand transition-colors cursor-pointer"
                    >
                      <Plus size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-2 flex flex-col flex-1">
                  <span className="text-xs text-card-foreground font-mono">
                    {prod.sku || "SIN SKU"}
                  </span>
                  <h3 className="text-sm font-bold text-card-foreground line-clamp-2 mt-0.5 flex-1">
                    {prod.name_prod}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
