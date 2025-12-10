import { supabase } from "@/api/supabaseClient";
//importamos el type de branch
import type { BranchInput, BranchOutput } from "@/types/branch";

//función para obtener todas las sucursales
export const getBranches = async (): Promise<BranchOutput[]> => {
  const { data, error } = await supabase.from("branches").select("*");

  if (error) throw error;

  return data;
};

//función para crear una nueva sucursal
export const createBranch = async (branchData: BranchInput) => {
  const { data, error } = await supabase
    .from("branches")
    .insert({ branchName: branchData.branchName, address: branchData.address })
    .select()
    .single();

  if (error) throw error;

  return data;
};

import { type updateType } from "@/types/branch";

//funcion para actualizar una sucursal
export const updateBranch = async ({ id, dataBranch }: updateType) => {
  //lógica de actualización
  const { data, error } = await supabase
    .from("branches")
    .update({ branchName: dataBranch.branchName, address: dataBranch.address })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

//función para eliminar una sucursal
export const deleteBranch = async (idBranch: string) => {
  const { data, error } = await supabase
    .from("branches")
    .delete()
    .eq("id", idBranch)
    .select()
    .single();

  if (error) throw error;

  return data;
};
