import { supabase } from "@/api/supabaseClient";
import type { TopProductB } from "@/reports/types/tops";

//hook para obtener los productos mas vendidos
export const useTopProducts = async (
  branchId: string | null,
  limit: number
): Promise<TopProductB[]> => {
  const { data, error } = await supabase.rpc("get_top_selling_products", {
    branch_id: branchId,
    limit_count: limit,
  });

  if (error) {
    console.error("Error fetching top products:", error);
    throw new Error(error.message);
  }

  return data as TopProductB[];
};

//service para el top de sucursales
export const getTopBranches = async (limit: number): Promise<TopProductB[]> => {
  const { data, error } = await supabase.rpc("get_top_branches_by_revenue", {
    limit_count: limit,
  });

  if (error) {
    console.error("Error fetching top branches:", error);
    throw new Error(error.message);
  }

  return data as TopProductB[];
};
