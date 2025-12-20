import { useGetProdPos } from "@/hooks/sale/useGetProdPos";
import type { CartItem, ProductPos } from "@/pages/sale/Sale";
import { useCallback, useEffect, useState } from "react";

interface Props {
  currentBranch: string | null;
  category: string | null;
  search: string;
  LIMIT?: number;
  cart: CartItem[];
}

export const useProducts = ({
  currentBranch,
  category,
  search,
  LIMIT = 10,
  cart,
}: Props) => {
  const [products, setProducts] = useState<ProductPos[]>([]);
  const [page, setPage] = useState(0);
  //usamos el hook de traer los productos para el punto de venta
  const { mutateAsync: fetchProducts, isPending } = useGetProdPos();
  // CARGA DE PRODUCTOS (Optimizada)
  const loadProducts = useCallback(
    async (reset = false) => {
      if (!currentBranch) return;

      const newOffset = reset ? 0 : page * LIMIT;
      try {
        const data = await fetchProducts({
          p_branch_id: currentBranch,
          p_search_term: search,
          p_category_id: category === "Todos" ? null : category,
          p_limit: LIMIT,
          p_offset: newOffset,
        });

        setProducts((prev) =>
          reset ? data || [] : [...prev, ...(data || [])]
        );
        setPage((prev) => (reset ? 1 : prev + 1));
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    },
    [currentBranch, search, category, page, fetchProducts]
  );

  // EFECTO PARA CARGAR PRODUCTOS AL CAMBIAR FILTROS
  useEffect(() => {
    loadProducts(true);
  }, [search, category, currentBranch]);

  //funcion para obtener el stock disponible de un producto
  const getAvailableStock = (productId: string) => {
    const inCart = cart.find((i) => i.id === productId)?.quantity ?? 0;
    const stock = products.find((p) => p.id === productId)?.stock ?? 0;
    return stock - inCart;
  };

  return {
    products,
    isPending,
    loadProducts,
    getAvailableStock,
  };
};
