// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
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
    /* =====================================================
       1️⃣ Validar token del usuario que llama
    ===================================================== */
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const jwt = authHeader.replace("Bearer ", "");

    // Cliente como usuario (para validar rol)
    const supabaseUserClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: { headers: { Authorization: `Bearer ${jwt}` } },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseUserClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Usuario inválido" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    /* =====================================================
       2️⃣ Validar que sea SUPERADMIN
    ===================================================== */
    const { data: dbUser, error: dbUserError } = await supabaseUserClient
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
      return new Response(JSON.stringify({ error: "Permisos insuficientes" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    /* =====================================================
       3️⃣ Cliente admin (Service Role)
    ===================================================== */
    const supabaseAdminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    /* =====================================================
       4️⃣ Leer payload del form
       - email siempre viene
       - password solo si resetPassword === true
    ===================================================== */
    const { p_employee_id, email, resetPassword, password } = await req.json();

    /* =====================================================
       5️⃣ Obtener auth_user_id del empleado
    ===================================================== */
    const { data: userRow, error: userRowError } = await supabaseAdminClient
      .from("users")
      .select("auth_user_id")
      .eq("employeeId", p_employee_id)
      .single();

    if (userRowError || !userRow?.auth_user_id) {
      return new Response(JSON.stringify({ error: "Empleado no encontrado" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    /* =====================================================
       6️⃣ Construir update dinámico para Auth
       (clave de toda la solución)
    ===================================================== */
    const authUpdateData: {
      email?: string;
      password?: string;
    } = {};

    // Email siempre se actualiza
    if (email) {
      authUpdateData.email = email;
    }

    // Password SOLO si se pidió reset
    if (resetPassword && password) {
      authUpdateData.password = password;
    }

    /* =====================================================
       7️⃣ Actualizar Supabase Auth
    ===================================================== */
    const { error: authError } =
      await supabaseAdminClient.auth.admin.updateUserById(
        userRow.auth_user_id,
        authUpdateData
      );

    if (authError) throw authError;

    /* =====================================================
       8️⃣ Actualizar tabla users (solo email)
    ===================================================== */
    await supabaseAdminClient
      .from("users")
      .update({ email })
      .eq("employeeId", p_employee_id);

    /* =====================================================
       9️⃣ Respuesta final
    ===================================================== */
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/update-employee' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
