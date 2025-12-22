import { useGetProdPos } from "@/hooks/pos/useGetProdPos";
import type { CartItem, ProductPos } from "@/pages/Pos/Pos";
import { useMemo, useState } from "react";

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
  const [page, setPage] = useState(0);
  //usamos el hook de traer los productos para el punto de venta
  const { data, isPending } = useGetProdPos({
    p_branch_id: currentBranch!,
    p_search_term: search,
    p_category_id: category === "Todos" ? null : category,
    p_limit: LIMIT,
    p_offset: page * LIMIT,
  });

  const products: ProductPos[] = useMemo(() => data ?? [], [data]);

  // 👉 para paginación
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  //funcion para obtener el stock disponible de un producto
  const getAvailableStock = (productId: string) => {
    const inCart = cart.find((i) => i.id === productId)?.quantity ?? 0;
    const stock = products.find((p) => p.id === productId)?.stock ?? 0;
    return stock - inCart;
  };

  return {
    products,
    isPending,
    loadMore,
    getAvailableStock,
  };
};
