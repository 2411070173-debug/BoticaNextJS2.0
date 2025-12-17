"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Crown, Check, Zap, Shield, Truck, HeadphonesIcon } from "lucide-react";

const PLANS = [
  {
    id: "FREE",
    name: "Plan Gratuito",
    price: 0,
    icon: Shield,
    color: "gray",
    features: [
      "Acceso al catálogo completo",
      "Compras sin límite",
      "Historial de pedidos básico",
    ],
    limitations: [
      "Sin descuentos",
      "Envío estándar (costo adicional)",
      "Soporte por email",
    ],
  },
  {
    id: "BASIC",
    name: "Plan Básico",
    price: 29.90,
    icon: Zap,
    color: "blue",
    popular: false,
    features: [
      "Todo lo del plan gratuito",
      "10% de descuento en todas las compras",
      "Historial completo de pedidos",
      "Recordatorios de medicamentos",
      "Soporte prioritario",
    ],
  },
  {
    id: "PREMIUM",
    name: "Plan Premium",
    price: 59.90,
    icon: Crown,
    color: "blue",
    popular: true,
    features: [
      "Todo lo del plan básico",
      "20% de descuento en todas las compras",
      "Envío gratis en todos los pedidos",
      "Acceso anticipado a nuevos productos",
      "Consultas farmacéuticas gratuitas",
      "Soporte 24/7",
      "Programa de puntos de recompensa",
    ],
  },
];

export function SubscriptionView() {
  const { subscription } = useAuth();

  const currentPlan = subscription?.subscription_type || "FREE";

  const getPlanColor = (color: string) => {
    const colors = {
      gray: "from-gray-500 to-gray-600",
      blue: "from-blue-500 to-blue-600",
      blue: "from-blue-500 to-blue-600",
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Planes de Suscripción</h1>
        <p className="mt-3 text-lg text-gray-600">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Current Plan Banner */}
      {subscription && (
        <Card className="border-l-4 border-blue-500 bg-blue-50 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Crown className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-900">
                Plan Actual: {currentPlan}
              </p>
              <p className="text-sm text-blue-700">
                {subscription.is_active ? "Activo" : "Inactivo"}
                {subscription.end_date && ` - Vence el ${new Date(subscription.end_date).toLocaleDateString("es-ES")}`}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan === plan.id;

          return (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${
                plan.popular ? "border-2 border-purple-500 shadow-xl" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute right-0 top-0 bg-blue-500 px-4 py-1 text-xs font-bold text-white">
                  MÁS POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${getPlanColor(plan.color)} p-6 text-white`}>
                <Icon className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">S/ {plan.price}</span>
                  <span className="text-sm opacity-90">/mes</span>
                </div>
              </div>

              {/* Plan Features */}
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation, index) => (
                    <li key={`limit-${index}`} className="flex items-start gap-3 opacity-60">
                      <span className="text-sm text-gray-500">• {limitation}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {isCurrentPlan ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      Plan Actual
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {plan.price === 0 ? "Plan Gratuito" : "Actualizar Plan"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Beneficios de Suscribirte
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="mx-auto w-fit rounded-full bg-blue-100 p-4 mb-4">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Envío Rápido</h3>
            <p className="text-sm text-gray-600">
              Recibe tus medicamentos en la puerta de tu casa
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="mx-auto w-fit rounded-full bg-blue-100 p-4 mb-4">
              <HeadphonesIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Soporte 24/7</h3>
            <p className="text-sm text-gray-600">
              Asistencia farmacéutica cuando la necesites
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="mx-auto w-fit rounded-full bg-green-100 p-4 mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Garantía Total</h3>
            <p className="text-sm text-gray-600">
              Productos 100% originales y certificados
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
