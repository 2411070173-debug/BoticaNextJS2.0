"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

const INITIAL_CART: CartItem[] = [
  { id: "1", name: "Paracetamol 500mg", price: 5.50, quantity: 2, stock: 150 },
  { id: "2", name: "Vitamina C 1000mg", price: 10.00, quantity: 1, stock: 180 },
];

export function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + delta));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.00;
  const total = subtotal + shipping;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
        <p className="mt-2 text-gray-600">
          Revisa tus productos antes de finalizar la compra
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 mb-6">
                Agrega productos desde el catálogo
              </p>
              <Button>Ir al Catálogo</Button>
            </Card>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-center gap-4">
                  {/* Product Image Placeholder */}
                  <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">💊</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Stock disponible: {item.stock} unidades
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      S/ {item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  <p className="text-sm text-gray-600">
                    Subtotal:{" "}
                    <span className="font-bold text-gray-900">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Gratis" : `S/ ${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">
                    ✓ Envío gratis en compras mayores a S/ 50
                  </p>
                )}
                <div className="pt-3 border-t border-gray-200 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                <CreditCard className="h-5 w-5" />
                Proceder al Pago
              </Button>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-900">
                  <strong>💳 Métodos de pago aceptados:</strong>
                  <br />
                  Tarjetas de crédito/débito, transferencias bancarias
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
