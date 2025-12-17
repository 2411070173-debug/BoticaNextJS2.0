import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Faltan variables de entorno de Supabase. Por favor, crea un archivo .env.local en la raíz del proyecto con:\n" +
        "NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co\n" +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui\n\n" +
        "Puedes obtener estas credenciales en: https://supabase.com/dashboard/project/_/settings/api"
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
