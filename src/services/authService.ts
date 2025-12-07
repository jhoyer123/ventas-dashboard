import { supabase } from "@/api/supabaseClient";

export interface loginCredentials {
  email: string;
  password: string;
}

//verifica si el usuario está autenticado
export const checkAuth = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;

  return session?.user || null; // si no hay sesión, devuelve null
};
