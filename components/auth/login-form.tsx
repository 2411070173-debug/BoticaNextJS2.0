"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CLIENT" | "ADMIN">("CLIENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Obtener error de la URL si existe (para OAuth errors)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlError = params.get("error");
      if (urlError) {
        setError(decodeURIComponent(urlError));
        // Limpiar la URL
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        // Mensajes de error más claros
        if (authError.message.includes("Invalid login credentials")) {
          throw new Error("Email o contraseña incorrectos");
        } else if (authError.message.includes("Email not confirmed")) {
          throw new Error("Por favor, confirma tu email antes de iniciar sesión");
        }
        throw authError;
      }

      if (!data.session) {
        throw new Error("No se pudo crear la sesión. Intenta nuevamente.");
      }

      // Esperar a que las cookies se sincronicen correctamente
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Forzar recarga de la sesión del servidor y redirigir
      router.refresh();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error con Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ingresar como
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "CLIENT" | "ADMIN")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="CLIENT">Cliente</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Selecciona tu tipo de cuenta
          </p>
        </div>

        {error && <Alert variant="error">{error}</Alert>}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Iniciar sesión"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">O</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Continuar con Google"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/auth/sign-up" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
// ...existing code...
