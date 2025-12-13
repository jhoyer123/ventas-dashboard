import { supabase } from "@/api/supabaseClient";
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
export const updateCategory = async (catData: categoryInput) => {
  const { data, error } = await supabase
    .from("categories")
    .update(catData)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

//get categorias
export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select();

  if (error) throw new Error(error.message);

  return data;
};

//delete categorias
export const deleteCategories = async (idCat: string) => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", idCat);

  if (error) throw new Error(error.message);

  return data;
};
