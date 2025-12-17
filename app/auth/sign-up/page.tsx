import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-600">💊 Botica MVP</h1>
          <p className="mt-2 text-gray-600">Crea tu cuenta</p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
