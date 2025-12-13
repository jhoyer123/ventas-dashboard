import { supabase } from "@/api/supabaseClient";
import type { productInputService } from "@/types/product";
//parametors que enviaremos al backend
import type { TableParams } from "@/components/common/tabla/api";

//create product
export const createProduct = async (dataProducto: productInputService) => {
  const { data, error } = await supabase
    .from("products")
    .insert({
      sku: dataProducto.sku,
      nameProd: dataProducto.nameProd,
      price: dataProducto.price,
      cost: dataProducto.cost,
      description: dataProducto.description,
      activo: dataProducto.activo,
      brand: dataProducto.brand,
      categoryId: dataProducto.categoryId,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  console.log("data producto service", data);

  for (let i = 0; i < dataProducto.images.length; i++) {
    const file = dataProducto.images[i];

    // Subir archivo
    const upload = await supabase.storage
      .from("img-products")
      .upload(`product-${data.id}/${file.name}`, file);

    // Obtener URL pública
    const { data: url } = supabase.storage
      .from("img-products")
      .getPublicUrl(`product-${data.id}/${file.name}`);

    // Guardar URL en la base de datos
    const insert = await supabase.from("product_images").insert({
      product_id: data.id,
      image_url: url.publicUrl,
      position: i + 1,
    });

    if (upload.error) {
      console.log(upload.error);
      throw new Error(upload.error.message);
    }

    if (insert.error) {
      console.log(insert.error);
      throw new Error(insert.error.message);
    }
  }

  return data;
};

//traer los productos
export const getProducts = async (
  params: TableParams,
  branchId: string | null
) => {
  // Calculamos la paginación
  const from = (params.pageIndex - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  let query = supabase.from("products").select(
    `
    *,
    product_images (*)
  `,
    { count: "exact" }
  );

  // Búsqueda global
  if (params.globalFilter) {
    const search = params.globalFilter;
    query = query.or(
      `nameProd.ilike.%${search}%,sku.ilike.%${search}%,brand.ilike.%${search}%,price.ilike.%${search}%`
    );
  }

  //ahora verificar si traer solo los empleados de una sucursal o de todas
  if (branchId !== null) {
    query = query.eq("branchId", branchId);
  }

  // Aplicamos ordenamiento
  if (params.sorting.length > 0) {
    params.sorting.forEach((sort) => {
      query = query.order(sort.id, { ascending: !sort.desc });
    });
  }

  // Aplicamos el range DIRECTAMENTE (Supabase maneja automáticamente si hay menos datos)
  query = query.range(from, to);

  // Ejecutamos la query
  const { data, error, count } = await query;

  //console.log("Llamada");
  if (error) {
    console.error("Error en query:", error);
    throw error;
  }

  return {
    data: data || [],
    meta: {
      total: count || 0,
      page: params.pageIndex,
      limit: params.pageSize,
      totalPages: Math.ceil((count || 0) / params.pageSize),
    },
  };
};

export const updateProduct = async (
  id: string,
  dataProducto: productInputService
) => {
  // 1. Actualizar datos del producto
  const { data, error } = await supabase
    .from("products")
    .update({
      sku: dataProducto.sku,
      nameProd: dataProducto.nameProd,
      price: dataProducto.price,
      cost: dataProducto.cost,
      description: dataProducto.description,
      activo: dataProducto.activo,
      brand: dataProducto.brand,
      categoryId: dataProducto.categoryId,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Si no hay nuevas imágenes → fin
  if (!dataProducto.images || dataProducto.images.length === 0) {
    return data;
  }

  // 2. Borrar imágenes anteriores del bucket
  await supabase.storage.from("img-products").remove([`product-${id}`]);

  // 3. Borrar registros anteriores de product_images
  await supabase.from("product_images").delete().eq("product_id", id);

  // 4. Subir imágenes nuevas
  for (let i = 0; i < dataProducto.images.length; i++) {
    const file = dataProducto.images[i];

    const upload = await supabase.storage
      .from("img-products")
      .upload(`product-${id}/${file.name}`, file);

    if (upload.error) throw new Error(upload.error.message);

    const { data: url } = supabase.storage
      .from("img-products")
      .getPublicUrl(`product-${id}/${file.name}`);

    const insert = await supabase.from("product_images").insert({
      product_id: id,
      image_url: url.publicUrl,
      position: i + 1,
    });

    if (insert.error) throw new Error(insert.error.message);
  }

  return data;
};

// SOFT DELETE — desactivar producto
export const deleteProduct = async (id: number) => {
  const { data, error } = await supabase
    .from("products")
    .update({ activo: false })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data; // producto desactivado
};
