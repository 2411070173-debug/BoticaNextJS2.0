"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "@/components/ui/alert";
import { Search, Package, Clock, CheckCircle, XCircle, Eye, Filter } from "lucide-react";
import { useState } from "react";

const SAMPLE_ORDERS = [
  {
    id: "ORD-001",
    customerName: "Juan Pérez",
    customerEmail: "juan@email.com",
    date: "2024-12-15",
    total: 45.50,
    status: "COMPLETED",
    items: 3,
  },
  {
    id: "ORD-002",
    customerName: "María García",
    customerEmail: "maria@email.com",
    date: "2024-12-14",
    total: 78.00,
    status: "PENDING",
    items: 2,
  },
  {
    id: "ORD-003",
    customerName: "Carlos López",
    customerEmail: "carlos@email.com",
    date: "2024-12-13",
    total: 32.00,
    status: "COMPLETED",
    items: 2,
  },
  {
    id: "ORD-004",
    customerName: "Ana Martínez",
    customerEmail: "ana@email.com",
    date: "2024-12-12",
    total: 120.50,
    status: "PENDING",
    items: 5,
  },
  {
    id: "ORD-005",
    customerName: "Pedro Sánchez",
    customerEmail: "pedro@email.com",
    date: "2024-12-11",
    total: 25.00,
    status: "CANCELLED",
    items: 1,
  },
];

const STATUS_CONFIG = {
  PENDING: {
    label: "Pendiente",
    color: "bg-yellow-100 text-yellow-800",
  },
  COMPLETED: {
    label: "Completado",
    color: "bg-green-100 text-green-800",
  },
  CANCELLED: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800",
  },
};

export function AllOrdersView() {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  if (!isAdmin) {
    return (
      <Alert variant="error">
        No tienes permisos para acceder a esta página. Solo administradores pueden ver todos los pedidos.
      </Alert>
    );
  }

  const filteredOrders = SAMPLE_ORDERS.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: SAMPLE_ORDERS.length,
    pending: SAMPLE_ORDERS.filter((o) => o.status === "PENDING").length,
    completed: SAMPLE_ORDERS.filter((o) => o.status === "COMPLETED").length,
    cancelled: SAMPLE_ORDERS.filter((o) => o.status === "CANCELLED").length,
    revenue: SAMPLE_ORDERS.filter((o) => o.status === "COMPLETED").reduce(
      (sum, o) => sum + o.total,
      0
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <p className="mt-2 text-gray-600">
          Administra todos los pedidos de los clientes
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
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
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ingresos</p>
              <p className="text-2xl font-bold text-gray-900">
                S/ {stats.revenue.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por ID, cliente o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Todos los estados</option>
              <option value="PENDING">Pendientes</option>
              <option value="COMPLETED">Completados</option>
              <option value="CANCELLED">Cancelados</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusConfig =
                  STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];

                return (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.customerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.date).toLocaleDateString("es-ES")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items} productos
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        S/ {order.total.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* No Results */}
      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">
            No se encontraron pedidos que coincidan con los filtros
          </p>
        </Card>
      )}
    </div>
  );
}
