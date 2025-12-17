import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Si hay un error de OAuth, redirigir a login con mensaje
  if (error) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("error", errorDescription || error);
    return NextResponse.redirect(url);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error("Error exchanging code for session:", exchangeError);
        const url = new URL("/auth/login", request.url);
        url.searchParams.set("error", "Error al autenticar con Google. Intenta nuevamente.");
        return NextResponse.redirect(url);
      }

      // Verificar que la sesión se haya creado correctamente
      if (!data.session) {
        console.error("No session created after code exchange");
        const url = new URL("/auth/login", request.url);
        url.searchParams.set("error", "No se pudo crear la sesión. Intenta nuevamente.");
        return NextResponse.redirect(url);
      }

      // Verificar que el usuario esté autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error("Error getting user after exchange:", userError);
        const url = new URL("/auth/login", request.url);
        url.searchParams.set("error", "Error al verificar la autenticación.");
        return NextResponse.redirect(url);
      }

      // Redirigir al dashboard - las cookies ya están establecidas por exchangeCodeForSession
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (err) {
      console.error("Error en callback:", err);
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("error", "Error al procesar la autenticación.");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}
