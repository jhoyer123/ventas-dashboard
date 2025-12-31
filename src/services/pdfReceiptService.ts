import { supabase } from "@/api/supabaseClient";

//service para traer los productops de una venta
export const getProductsSale = async (saleId: string) => {
  const { data, error } = await supabase
    .from("saleDetails")
    .select(
      `quantity,unitPrice
    , products (
      id,
      nameProd
    )`
    )
    .eq("saleId", saleId);

  if (error) {
    throw new Error(error.message);
  }
  console.log("Raw Products Sale Data:", data);
  if (!data) return [];
  
  // Refinar datos con validación
  return data.map((item) => {
    // Verificamos si products es array o objeto único
    const prod = Array.isArray(item.products)
      ? item.products[0]
      : item.products;

    return {
      id: prod?.id ?? "N/A",
      name: prod?.nameProd ?? "Producto no encontrado",
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice, // Tip: añade el total por item de una vez
    };
  });
};
