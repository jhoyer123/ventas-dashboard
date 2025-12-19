import { supabase } from "@/api/supabaseClient";
//importamos el type de branch
import type { BranchInput, BranchOutput } from "@/types/branch";
import { type updateType } from "@/types/branch";

//funcion para obtener todas las sucursales donde no esta un producto
export const getBranchWP = async (productId: string) => {
  const { data: assigned, error: assignedError } = await supabase
    .from("branchStocks")
    .select("branchId")
    .eq("productId", productId);

  if (assignedError) {
    throw new Error(assignedError.message);
  }

  const assignedBranchIds = assigned.map((item) => item.branchId);

  let query = supabase.from("branches").select("*");

  if (assignedBranchIds.length > 0) {
    query = query.not("id", "in", `(${assignedBranchIds.join(",")})`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//función para obtener todas las sucursales directo sin stats sin nada solo datos basicos
export const getBranches = async (): Promise<BranchOutput[]> => {
  const { data, error } = await supabase.from("branches").select("*");

  if (error) throw error;

  return data;
};

//trae las sucursales para la vista de sucursales con stats
export const getBranchesES = async () => {
  const { data, error } = await supabase.rpc("get_branches_with_stats");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

//función para crear una nueva sucursal
export const createBranch = async (branchData: BranchInput) => {
  const { data, error } = await supabase
    .from("branches")
    .insert({ branchName: branchData.branch_name, address: branchData.address })
    .select()
    .single();

  if (error) throw error;

  return data;
};

//funcion para actualizar una sucursal
export const updateBranch = async ({ id, dataBranch }: updateType) => {
  //lógica de actualización
  const { data, error } = await supabase
    .from("branches")
    .update({ branchName: dataBranch.branch_name, address: dataBranch.address })
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
