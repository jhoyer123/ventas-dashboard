import { supabase } from "@/api/supabaseClient";
//parametors que enviaremos al backend
import type { TableParams } from "@/components/common/tabla/api";
import type { ProductInputService } from "@/schemes/product";
import type { ProductSupT } from "@/types/product";

//create product
export const createProduct = async (dataProducto: ProductInputService) => {
  const { data, error } = await supabase
    .from("products")
    .insert({
      sku: dataProducto.sku,
      nameProd: dataProducto.nameProd,
      price: dataProducto.price,
      cost: dataProducto.cost,
      description: dataProducto.description,
      brand: dataProducto.brand,
      categoryId: dataProducto.categoryId,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

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
      //console.log(upload.error);
      throw new Error(upload.error.message);
    }

    if (insert.error) {
      //console.log(insert.error);
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
    //console.error("Error en query:", error);
    throw error;
  }
  console.log("Productos obtenidos:", data);
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

//get product by id
export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select(`*,product_images (*)`)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//update product
export const updateProduct = async (id: string, dataProducto: ProductSupT) => {
  //Actualizar datos del producto
  const { data, error } = await supabase
    .from("products")
    .update({
      sku: dataProducto.sku,
      nameProd: dataProducto.nameProd,
      price: dataProducto.price,
      cost: dataProducto.cost,
      description: dataProducto.description,
      brand: dataProducto.brand,
      categoryId: dataProducto.categoryId,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  //Eliminar imágenes marcadas
  if (dataProducto.imageToDelete?.length) {
    //Eliminar registros en DB
    const { error: dbError } = await supabase
      .from("product_images")
      .delete()
      .in("image_url", dataProducto.imageToDelete);

    if (dbError) throw new Error(dbError.message);

    //Eliminar archivos del bucket
    const paths = dataProducto.imageToDelete.map((url) => {
      const pathname = new URL(url).pathname;
      return pathname.replace("/storage/v1/object/public/img-products/", "");
    });

    const { error: storageError } = await supabase.storage
      .from("img-products")
      .remove(paths);

    if (storageError) throw new Error(storageError.message);
  }

  //Subir nuevas imágenes
  if (dataProducto.images?.length) {
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
        //console.log(upload.error);
        throw new Error(upload.error.message);
      }

      if (insert.error) {
        //console.log(insert.error);
        throw new Error(insert.error.message);
      }
    }
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
