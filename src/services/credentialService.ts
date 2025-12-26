import { supabase } from "@/api/supabaseClient";

//service para cambiar las credenciales de un empleado (email y password)
export interface UpdateEmployeeCredentialsI {
  employeeId: string;
  email: string;
  resetPassword: boolean;
  password?: string;
}

export const updateEmployeeCredentials = async ({
  employeeId,
  email,
  resetPassword,
  password,
}: UpdateEmployeeCredentialsI) => {
  if (!employeeId) throw new Error("No employee ID provided");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("No session");

  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-employee`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        p_employee_id: employeeId,
        email,
        resetPassword,
        password,
      }),
    }
  );

  const json = await res.json();

  if (!res.ok) throw new Error(json.error);

  return json;
};
