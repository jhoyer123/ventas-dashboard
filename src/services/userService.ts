import { supabase } from "@/api/supabaseClient";
import { type TableParams } from "@/components/common/tabla/api";

// Get employees desde supabase - OPTIMIZADO
export const getUsers = async (
  params: TableParams,
  branchId: string | null
) => {
  // Calculamos la paginación
  const from = (params.pageIndex - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  // UNA SOLA QUERY con count incluido
  //let query = supabase.from("employees").select("*", { count: "exact" });
  let query = supabase.from("users").select(`*,employee:employees(name,phone)`, { count: "exact" });

  // Búsqueda global
  if (params.globalFilter) {
    const search = params.globalFilter;
    query = query.or(
      `name.ilike.%${search}%,cedula.ilike.%${search}%,address.ilike.%${search}%,phone.ilike.%${search}%`
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
