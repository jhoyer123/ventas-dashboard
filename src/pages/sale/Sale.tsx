import { useState } from "react";
//branch context
import { useBranch } from "@/context/BranchContext";
//user context
import { useAuth } from "@/context/AuthContext";
//hook de categorias get
import { useGetCatForSale } from "@/hooks/category/useGetCatForSale";
import { HeaderPos } from "@/components/Pos/HeaderPos";
import { ProductsPos } from "@/components/Pos/ProductsPos";
import { CircleAlert } from "lucide-react";
import { AsidePos } from "@/components/Pos/AsidePos";
import { useCart } from "@/hooks/pos/hooksLogic/useCart";
import { useProducts } from "@/hooks/pos/hooksLogic/useProducts";
import { FooterPos } from "@/components/Pos/FooterPos";
import { ModalPosE } from "@/components/Pos/ModalPosE";
import { ca } from "date-fns/locale";
import type { SaleInput } from "@/types/Sale";
import type { SaleFormValues } from "@/schemes/saleExecute";

// Interfaces
export interface ProductPos {
  id: string;
  name_prod: string;
  sku: string | null;
  price: number;
  price_offer: number | null;
  is_offer_active: boolean;
  stock: number;
  main_image: string;
}

export interface CartItem extends ProductPos {
  quantity: number;
  subtotal: number;
}

export interface Totals {
  subtotal: number;
  tax: number;
  calculatedTotal: number;
  finalAmount: number;
  difference: number;
}

export interface Client {
  name: string;
  idNit?: string;
}

export type EditingQtyMap = Record<string, string>;

export const Sale = () => {
  //usamos el context de sucursal
  const { currentBranch } = useBranch();
  //usamos el context del userAuth
  const { user } = useAuth();
  //usamos el hook de traer las categorias
  const { data: categories } = useGetCatForSale();
  //estados locales para el componente
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const LIMIT = 20;
  //usamos el hook de traer los productos para el punto de venta

  //USAMOS EL HOOK USECART
  const cartLogic = useCart();
  //USAMOS EL HOOK DEL PRODUCTOS
  const productsLogic = useProducts({
    currentBranch,
    category,
    search,
    LIMIT,
    cart: cartLogic.cart,
  });

  //estado del modal de finalizar venta
  const [isModalOpen, setIsModalOpen] = useState(false);

  //FUNCION PARA EJECUTAR VENTA
  //aqui usaremos el hook
  const executeSale = (
    carts: CartItem[],
    totals: Totals,
    dataF: SaleFormValues
  ) => {
    //primero que nada refinar los datos
    const prodRef = carts.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice:
        item.is_offer_active && item.price_offer
          ? item.price_offer
          : item.price,
      totalPrice: item.subtotal,
    }));
    const datosE: SaleInput = {
      branchId: currentBranch!,
      userId: user!.id,
      clientName: dataF.name,
      clientNit: dataF.idNit!,
      paymentMethod: dataF.paymentMethod!,
      status: dataF.status!,
      totalAmount: totals.calculatedTotal,
      discountAmount: cartLogic.isDebt
        ? 0
        : cartLogic.manualAmount !== ""
        ? totals.calculatedTotal - Number(cartLogic.manualAmount)
        : 0,
      finalAmount:
        cartLogic.manualAmount !== ""
          ? Number(cartLogic.manualAmount)
          : totals.calculatedTotal,
      debtAmount: cartLogic.isDebt
        ? totals.calculatedTotal - Number(cartLogic.manualAmount)
        : 0,
      products: prodRef,
    };
    //logica para ejecutar la venta
    //promesa simulada
    //mandamos la promesa al toast
    console.log("Ejecutando venta con los siguientes datos:", datosE);
    cartLogic.setCart([]); // Limpiar el carrito después de la venta
    cartLogic.setManualAmount("");
    cartLogic.setIsDebt(false);
  };

  if (!currentBranch) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-6 p-10">
        <CircleAlert className="size-20 text-red-400 animate-pulse" />
        <h2 className="text-center text-3xl font-bold text-slate-700 max-w-2xl">
          Seleccione una sucursal para comenzar la venta.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-[#f8fafc] text-slate-900 overflow-hidden">
      {/* PANEL IZQUIERDO: CATÁLOGO */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* buscador + categorias */}
        <HeaderPos
          setSearch={setSearch}
          search={search}
          categories={categories || []}
          category={category}
          setCategory={setCategory}
        />

        {/* Grid de Productos */}
        <ProductsPos addToCart={cartLogic.addToCart} {...productsLogic} />

        {/* footer: close venta */}
        <FooterPos {...cartLogic} openModal={() => setIsModalOpen(true)} />
      </main>

      {/* PANEL DERECHO: CARRITO */}
      <AsidePos {...cartLogic} />

      {/* modal de Finalizar Venta */}
      <ModalPosE
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        carts={cartLogic.cart}
        totals={cartLogic.totals}
        executeSale={executeSale}
        manualMount={cartLogic.manualAmount}
      />
    </div>
  );
};
