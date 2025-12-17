import { supabase } from "@/api/supabaseClient";
import type { TableParams } from "@/components/common/tabla/api";
//importamos los tipos
import type { categoryInput } from "@/types/category";

//create categoria
export const createCategory = async (catData: categoryInput) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(catData)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

//update categorias
export const updateCategory = async (id: string, catData: categoryInput) => {
  const { data, error } = await supabase
    .from("categories")
    .update(catData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

//get categorias para los forms
export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select();

  if (error) throw new Error(error.message);

  return data;
};

//get categoria por para la Tabla con productos asociados
export const getCategoriesT = async (params: TableParams) => {
  // Calculamos la paginación
  const from = (params.pageIndex - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  // UNA SOLA QUERY con count incluido
  let query = supabase
    .from("v_categories_with_count")
    .select("*", { count: "exact" });

  // Búsqueda global
  if (params.globalFilter) {
    const search = params.globalFilter;
    query = query.or(
      `nameCat.ilike.%${search}%,description.ilike.%${search}%,total_products.ilike.%${search}%`
    );
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

  if (error) {
    throw new Error(error.message);
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

//delete categorias
export const deleteCategory = async (idCat: string) => {
  const { data, error } = await supabase.rpc("delete_category_safe", {
    cat_id: idCat,
  });

  if (error) {
    if (error.message.includes("CATEGORY_HAS_PRODUCTS")) {
      throw new Error(
        "La categoría no se puede eliminar porque tiene productos asociados."
      );
    }

    throw new Error("error al eliminar la categoría: " + error.message);
  }

  return data;
};
