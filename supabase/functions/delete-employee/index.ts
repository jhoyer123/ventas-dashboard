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
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    /* =====================================================
       1️⃣ Validar token
    ===================================================== */
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const jwt = authHeader.replace("Bearer ", "");

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
       2️⃣ Validar SUPERADMIN
    ===================================================== */
    const { data: dbUser, error: dbUserError } =
      await supabaseUserClient
        .from("users")
        .select("role")
        .eq("auth_user_id", user.id)
        .single();

    if (dbUserError || !dbUser || dbUser.role !== "SUPERADMIN") {
      return new Response(
        JSON.stringify({ error: "Permisos insuficientes" }),
        { status: 403, headers: corsHeaders }
      );
    }

    /* =====================================================
       3️⃣ Cliente admin (service role)
    ===================================================== */
    const supabaseAdminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    /* =====================================================
       4️⃣ Leer payload
    ===================================================== */
    const { employee_id } = await req.json();

    if (!employee_id) {
      return new Response(
        JSON.stringify({ error: "employee_id es requerido" }),
        { status: 400, headers: corsHeaders }
      );
    }

    /* =====================================================
       5️⃣ Llamar RPC
    ===================================================== */
    const { data: decision, error: rpcError } =
      await supabaseAdminClient.rpc("delete_employee_decision", {
        p_employee_id: employee_id,
      });

    if (rpcError) throw rpcError;

    const { action, auth_user_id } = decision as {
      action: "soft_delete" | "hard_delete";
      auth_user_id: string | null;
    };

    /* =====================================================
       6️⃣ Seguridad adicional (como dijiste)
    ===================================================== */
    if (!auth_user_id) {
      return new Response(JSON.stringify({ success: true, action }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    /* =====================================================
       7️⃣ Ejecutar acción en Auth
    ===================================================== */
    if (action === "soft_delete") {
      await supabaseAdminClient.auth.admin.updateUserById(auth_user_id, {
        banned: true,
      });
    }

    if (action === "hard_delete") {
      await supabaseAdminClient.auth.admin.deleteUser(auth_user_id);
    }

    /* =====================================================
       8️⃣ Respuesta final
    ===================================================== */
    return new Response(JSON.stringify({ success: true, action }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/delete-employee' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
