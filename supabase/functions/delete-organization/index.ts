// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// delete-organization (Edge Function)
///<reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
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
      { global: { headers: { Authorization: `Bearer ${jwt}` } } },
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
       2️⃣ Validar PLATFORM_ADMIN
    ===================================================== */
    const { data: dbUser, error: dbUserError } = await supabaseUserClient
      .from("users")
      .select("role")
      .eq("auth_user_id", user.id)
      .single();

    if (dbUserError || !dbUser || dbUser.role !== "PLATFORM_ADMIN") {
      return new Response(JSON.stringify({ error: "Permisos insuficientes" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    /* =====================================================
       3️⃣ Cliente admin (service role)
    ===================================================== */
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    /* =====================================================
       4️⃣ Leer payload
    ===================================================== */
    const { organization_id } = await req.json();

    if (!organization_id) {
      return new Response(
        JSON.stringify({ error: "organization_id requerido" }),
        { status: 400, headers: corsHeaders },
      );
    }

    /* =====================================================
       5️⃣ Obtener todos los auth_user_id de la organización
    ===================================================== */
    const { data: users, error: usersError } = await supabaseAdmin
      .from("users")
      .select("auth_user_id")
      .eq("organization_id", organization_id);

    if (usersError) throw usersError;

    /* =====================================================
       6️⃣ Eliminar cada usuario de Auth
    ===================================================== */
    if (users && users.length > 0) {
      const deletePromises = users.map((u) =>
        supabaseAdmin.auth.admin.deleteUser(u.auth_user_id),
      );
      await Promise.all(deletePromises);
    }

    /* =====================================================
       7️⃣ Borrar la organización (CASCADE hace el resto en DB)
    ===================================================== */
    const { error: deleteError } = await supabaseAdmin
      .from("organizations")
      .delete()
      .eq("id", organization_id);

    if (deleteError) throw deleteError;

    return new Response(
      JSON.stringify({ success: true, users_deleted: users?.length ?? 0 }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/delete-organization' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
