import { Metadata } from "next";
import { InventoryView } from "@/components/inventory/inventory-view";

export const metadata: Metadata = {
  title: "Inventario | Botica Plus",
  description: "Gestión de inventario de productos",
};

export default function InventoryPage() {
  return <InventoryView />;
}
