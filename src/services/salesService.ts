import { supabase } from "@/api/supabaseClient";

//service que trae los productos para la vista de punto de venta
interface getProdutsPosI {
  p_branch_id: string;
  p_search_term: string;
  p_category_id: string | null;
  p_limit: number;
  p_offset: number;
}

export const getProdutsPos = async ({
  p_branch_id,
  p_search_term,
  p_category_id,
  p_limit,
  p_offset,
}: getProdutsPosI) => {
  const { data, error } = await supabase.rpc("get_pos_products", {
    p_branch_id,
    p_search_term,
    p_category_id,
    p_limit,
    p_offset,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//service que ejecuta la venta
export const executeSaleService = async () => {};
