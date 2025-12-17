"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  User, 
  LogOut,
  Crown,
  Pill
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, profile, subscription, loading, signOut, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  // Determinar el plan de suscripción
  const getSubscriptionBadge = () => {
    if (!subscription) {
      return (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          FREE
        </span>
      );
    }

    const badgeColors = {
      FREE: "bg-gray-100 text-gray-700",
      BASIC: "bg-blue-100 text-blue-700",
      PREMIUM: "bg-purple-100 text-purple-700",
    };

    const color = badgeColors[subscription.subscription_type as keyof typeof badgeColors] || badgeColors.FREE;

    return (
      <span className={`rounded-full px-3 py-1 text-xs font-medium ${color} flex items-center gap-1`}>
        {subscription.subscription_type === "PREMIUM" && <Crown className="h-3 w-3" />}
        {subscription.subscription_type}
      </span>
    );
  };

  // Enlaces de navegación según rol
  const navLinks = isAdmin
    ? [
        { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
        { href: "/dashboard/catalog", label: "Catálogo", icon: Pill },
        { href: "/dashboard/inventory", label: "Inventario", icon: Package },
        { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingCart },
        { href: "/dashboard/medical-subscriptions", label: "Doctores", icon: User },
      ]
    : [
        { href: "/dashboard", label: "Dashboard", icon: User },
        { href: "/dashboard/catalog", label: "Catálogo", icon: Pill },
        { href: "/dashboard/my-orders", label: "Mis Pedidos", icon: ShoppingCart },
        { href: "/dashboard/cart", label: "Carrito", icon: ShoppingCart },
        { href: "/dashboard/medical-subscriptions", label: "Doctores", icon: User },
      ];

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 font-bold text-2xl text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Pill className="h-7 w-7" />
            <span>Botica Plus</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {loading ? (
              <LoadingSpinner />
            ) : user && profile ? (
              <>
                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Subscription Badge */}
                <div className="flex items-center gap-3 border-l border-gray-300 pl-6">
                  {getSubscriptionBadge()}
                  
                  {/* User Menu */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {profile.full_name || user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isAdmin ? "Administrador" : "Cliente"}
                      </p>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Salir
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors font-medium"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden space-y-3">
            {loading ? (
              <LoadingSpinner />
            ) : user && profile ? (
              <>
                <div className="px-4 pb-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {profile.full_name || user.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAdmin ? "Administrador" : "Cliente"}
                  </p>
                  <div className="mt-2">{getSubscriptionBadge()}</div>
                </div>

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}

                <div className="px-4 pt-3 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="block mx-4 py-2 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
