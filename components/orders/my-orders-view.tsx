"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

const SAMPLE_ORDERS = [
  {
    id: "ORD-001",
    date: "2024-12-15",
    total: 45.50,
    status: "COMPLETED",
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: 5.50 },
      { name: "Ibuprofeno 400mg", quantity: 1, price: 8.00 },
      { name: "Vitamina C 1000mg", quantity: 3, price: 10.00 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-12-10",
    total: 78.00,
    status: "PENDING",
    items: [
      { name: "Amoxicilina 500mg", quantity: 2, price: 15.00 },
      { name: "Omeprazol 20mg", quantity: 4, price: 12.00 },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-12-05",
    total: 32.00,
    status: "COMPLETED",
    items: [
      { name: "Loratadina 10mg", quantity: 2, price: 6.50 },
      { name: "Paracetamol 500mg", quantity: 3, price: 5.50 },
    ],
  },
];

const STATUS_CONFIG = {
  PENDING: {
    label: "Pendiente",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800",
    iconColor: "text-yellow-600",
  },
  COMPLETED: {
    label: "Completado",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
    iconColor: "text-green-600",
  },
  CANCELLED: {
    label: "Cancelado",
    icon: XCircle,
    color: "bg-red-100 text-red-800",
    iconColor: "text-red-600",
  },
};

export function MyOrdersView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
        <p className="mt-2 text-gray-600">
          Revisa el historial de tus pedidos y su estado
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{SAMPLE_ORDERS.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-yellow-100 p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">
                {SAMPLE_ORDERS.filter(o => o.status === "PENDING").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completados</p>
              <p className="text-2xl font-bold text-gray-900">
                {SAMPLE_ORDERS.filter(o => o.status === "COMPLETED").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {SAMPLE_ORDERS.map((order) => {
          const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={order.id} className="overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.color}`}>
                      <StatusIcon className="h-4 w-4" />
                      {statusConfig.label}
                    </span>
                    <p className="text-lg font-bold text-gray-900">
                      S/ {order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {SAMPLE_ORDERS.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No tienes pedidos aún
          </h3>
          <p className="text-gray-600 mb-6">
            Explora nuestro catálogo y realiza tu primer pedido
          </p>
          <Button>Ir al Catálogo</Button>
        </Card>
      )}
    </div>
  );
}
