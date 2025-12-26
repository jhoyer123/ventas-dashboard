// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

/* console.log("Hello from Functions!")

Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json " } },
  )
}) */

/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    /* ======================================================
     * 1️⃣ OBTENER JWT DEL USUARIO QUE LLAMA LA FUNCIÓN
     * ====================================================== */
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No autorizado" }),
        { status: 401, headers: corsHeaders }
      );
    }

    const jwt = authHeader.replace("Bearer ", "");

    /* ======================================================
     * 2️⃣ CLIENTE COMO USUARIO (NO SERVICE ROLE)
     * ====================================================== */
    const supabaseUserClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseUserClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Usuario inválido" }),
        { status: 401, headers: corsHeaders }
      );
    }

    /* ======================================================
     * 3️⃣ VERIFICAR QUE SEA SUPERADMIN
     * ====================================================== */
    const { data: dbUser, error: dbUserError } =
      await supabaseUserClient
        .from("users")
        .select("role")
        .eq("auth_user_id", user.id)
        .single();

    if (dbUserError || !dbUser) {
      return new Response(
        JSON.stringify({ error: "Usuario no registrado en el sistema" }),
        { status: 403, headers: corsHeaders }
      );
    }

    if (dbUser.role !== "SUPERADMIN") {
      return new Response(
        JSON.stringify({ error: "Permisos insuficientes" }),
        { status: 403, headers: corsHeaders }
      );
    }

    /* ======================================================
     * 4️⃣ CLIENTE ADMIN (SERVICE ROLE)
     * ====================================================== */
    const supabaseAdminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    /* ======================================================
     * 5️⃣ LEER PAYLOAD
     * ====================================================== */
    const { p_email, p_password, ...employeeData } = await req.json();

    /* ======================================================
     * 6️⃣ CREAR USUARIO EN AUTH
     * ====================================================== */
    const { data: authData, error: authError } =
      await supabaseAdminClient.auth.admin.createUser({
        email: p_email,
        password: p_password,
        email_confirm: true,
      });

    if (authError) {
      throw authError;
    }

    /* ======================================================
     * 7️⃣ LLAMAR RPC (employees + users)
     * ====================================================== */
    const { data, error: rpcError } =
      await supabaseAdminClient.rpc(
        "create_employee_and_user",
        {
          ...employeeData,
          p_email,
          p_auth_user_id: authData.user.id,
        }
      );

    if (rpcError) {
      // rollback auth user
      await supabaseAdminClient.auth.admin.deleteUser(
        authData.user.id
      );
      throw rpcError;
    }

    /* ======================================================
     * 8️⃣ RESPUESTA OK
     * ====================================================== */
    return new Response(JSON.stringify({ employee_id: data }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});



/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-employee' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
