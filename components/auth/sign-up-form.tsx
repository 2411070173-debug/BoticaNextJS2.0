"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"CLIENT" | "ADMIN">("CLIENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (authError) throw authError;

      // Si el usuario fue auto-confirmado (email confirmation deshabilitado en Supabase)
      // redirigir directamente al dashboard
      if (data.session) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        router.refresh();
        router.push("/dashboard");
      } else {
        // Mostrar mensaje de confirmación de email
        router.push("/auth/sign-up-success");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Juan Pérez"
            required
            disabled={loading}
          />
        </div>

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
            minLength={6}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tipo de cuenta
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
            Selecciona si eres cliente o administrador de la botica
          </p>
        </div>

        {error && <Alert variant="error">{error}</Alert>}

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Crear cuenta"}
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
          onClick={handleGoogleSignUp}
          variant="outline"
          className="w-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Registrarse con Google"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
