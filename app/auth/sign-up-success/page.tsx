export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="w-full max-w-md text-center">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido!</h1>
          <p className="mt-4 text-gray-600">
            Tu cuenta ha sido creada exitosamente. Por favor, revisa tu correo
            electrónico para confirmar tu cuenta.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            Después de confirmar tu correo, podrás acceder a tu dashboard y
            explorar nuestro catálogo de medicamentos.
          </p>
          <div className="mt-8 space-y-3">
            <a
              href="/auth/login"
              className="block rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
            >
              Ir al login
            </a>
            <a
              href="/"
              className="block rounded-lg border border-green-600 px-6 py-2 text-green-600 hover:bg-green-50"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
