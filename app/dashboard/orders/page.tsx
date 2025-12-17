import { Metadata } from "next";
import { AllOrdersView } from "@/components/orders/all-orders-view";

export const metadata: Metadata = {
  title: "Gestión de Pedidos | Botica Plus",
  description: "Administración de todos los pedidos",
};

export default function OrdersPage() {
  return <AllOrdersView />;
}
