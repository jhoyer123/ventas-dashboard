import { supabase } from "@/api/supabaseClient";

export interface loginCredentials {
  email: string;
  password: string;
}

//función para iniciar sesión con supabase
export const login = async ({ email, password }: loginCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
};

//función para cerrar sesión con supabase
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

//verifica si el usuario está autenticado con supabase
export const checkAuth = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;

  return data.session?.user; // si no hay sesión, devuelve null
};

//-----------  para el context datos del usuario  -----------------
export const userAuthData = async (authUserId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
    id,
    email,
    role,
    employeeId
  `
    )
    .eq("auth_user_id", authUserId).single();

  if (error) throw error;

  //console.log("userAuthDsdsdata:", data);
  return data;
};

export const userEmployee = async (employeeId: string) => {
  const { data, error } = await supabase
    .from("employees")
    .select("id,name,branchId")
    .eq("id", employeeId).single();

  if (error) throw error;

  return data;
};
//--------------------------------------------------------------
