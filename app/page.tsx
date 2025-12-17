import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-2xl text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Botica MVP</h1>
          <p className="text-xl text-gray-600 mb-8">
            Gestiona tus suscripciones de forma sencilla. Accede a tu plan y
            administra tu cuenta desde un solo lugar.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/sign-up">
              <Button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-lg">
                Crear cuenta
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg"
              >
                Iniciar sesión
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Autenticación Segura
              </h3>
              <p className="text-gray-600 text-sm">
                Inicia sesión con email y contraseña o usando Google OAuth
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Gestión de Suscripciones
              </h3>
              <p className="text-gray-600 text-sm">
                Visualiza y administra tu plan de suscripción en tiempo real
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Seguridad y Privacidad
              </h3>
              <p className="text-gray-600 text-sm">
                Tus datos están protegidos con tecnología de última generación
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Botica MVP. Hecho con ❤️ con Next.js y Supabase
          </p>
        </div>
      </footer>
    </div>
  );
}
