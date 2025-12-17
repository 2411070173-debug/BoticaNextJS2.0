"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function LogoutButton() {
  const router = useRouter();
  const { signOut, loading } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="text-red-600 hover:bg-red-50"
      disabled={loading}
    >
      {loading ? <LoadingSpinner /> : "Cerrar sesión"}
    </Button>
  );
}
