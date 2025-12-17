"use client";

import { useAuth } from "@/hooks/useAuth";
import { PageLoadingSpinner } from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Package, ShoppingCart, BarChart3, Pill, Crown } from "lucide-react";
import Link from "next/link";

export function UserDashboard() {
  const { user, subscription, loading: authLoading, isAdmin } = useAuth();

  if (authLoading) return <PageLoadingSpinner />;

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">Cargando información del usuario...</p>
      </div>
    );
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Panel de Administración
          </h1>
          <p className="mt-3 text-lg opacity-90">
            Gestiona tu botica desde aquí
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Productos</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pedidos Hoy</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ventas Hoy</p>
                <p className="text-2xl font-bold text-gray-900">S/ 1,245</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-yellow-100 p-3">
                <User className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Accesos Rápidos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/inventory">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Inventario</h3>
                    <p className="text-sm text-gray-600">Gestionar productos</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/orders">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-green-100 p-3">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Pedidos</h3>
                    <p className="text-sm text-gray-600">Ver todos los pedidos</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/catalog">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Pill className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Catálogo</h3>
                    <p className="text-sm text-gray-600">Ver productos</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Client Dashboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          ¡Bienvenido!
        </h1>
        <p className="mt-3 text-lg opacity-90">
          Tu salud es nuestra prioridad
        </p>
      </div>

      {/* Subscription Card */}
      {subscription && (
        <Card className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-900">
                  Plan {subscription.subscription_type}
                </p>
                <p className="text-sm text-blue-700">
                  {subscription.subscription_type === "PREMIUM" && "Disfruta de 20% de descuento y envío gratis"}
                  {subscription.subscription_type === "BASIC" && "Disfruta de 10% de descuento"}
                  {subscription.subscription_type === "FREE" && "Actualiza para obtener descuentos"}
                </p>
              </div>
            </div>
            <Link href="/dashboard/subscription">
              <Button variant="outline" className="bg-white">
                Ver Planes
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* User Info Card */}
      <Card className="border-2 border-blue-100 p-8 shadow-md">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-100 p-4">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Información de Usuario
            </h2>
            <p className="mt-1 text-gray-600">
              Detalles de tu cuenta
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Cuenta creada</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(user.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué deseas hacer?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/catalog">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Pill className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Explorar Catálogo</h3>
                  <p className="text-sm text-gray-600">Ver productos disponibles</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/my-orders">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-100 p-3">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Mis Pedidos</h3>
                  <p className="text-sm text-gray-600">Ver historial de compras</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/cart">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Mi Carrito</h3>
                  <p className="text-sm text-gray-600">Finalizar compra</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Success Message */}
      <Card className="border-l-4 border-green-500 bg-green-50 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-2">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-green-900">
              ¡Sesión iniciada correctamente!
            </h3>
            <p className="text-sm text-green-700">
              Explora nuestro catálogo y realiza tus compras de forma segura.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
