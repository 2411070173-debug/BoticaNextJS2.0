import { Metadata } from "next";
import { MyOrdersView } from "@/components/orders/my-orders-view";

export const metadata: Metadata = {
  title: "Mis Pedidos | Botica Plus",
  description: "Historial de tus pedidos",
};

export default function MyOrdersPage() {
  return <MyOrdersView />;
}
