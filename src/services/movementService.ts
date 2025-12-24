import { supabase } from "@/api/supabaseClient";
//type para los parametros de consulta de la tabla
import type { queryParams } from "@/types/table";

//service para traer todos los movimientos
export const getMovements = async (params: queryParams) => {
  const { page, limit, search, sortField, sortOrder, branchId } = params;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("movements_view").select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `product_name.ilike.%${search}%,employee_name.ilike.%${search}%,movedQuantity.eq.${search},type.ilike.%${search}%,branch_from_name.ilike.%${search}%,branch_to_name.ilike.%${search}%`
    );
  }

  if (branchId) {
    query = query.or(
      `branch_from_id.eq.${branchId},branch_to_id.eq.${branchId}`
    );
  }

  if (sortField) {
    query = query.order(sortField, {
      ascending: sortOrder === "asc",
    });
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: data ?? [],
    meta: {
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
};
