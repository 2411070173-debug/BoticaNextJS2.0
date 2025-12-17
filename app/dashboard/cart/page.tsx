import { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Carrito | Botica Plus",
  description: "Tu carrito de compras",
};

export default function CartPage() {
  return <CartView />;
}
