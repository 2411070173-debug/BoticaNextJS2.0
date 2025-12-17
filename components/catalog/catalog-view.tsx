"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Filter } from "lucide-react";
import { useState } from "react";

// Datos de ejemplo de productos
const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    description: "Analgésico y antipirético",
    price: 5.50,
    stock: 150,
    category: "Analgésicos",
    image_url: null,
  },
  {
    id: "2",
    name: "Ibuprofeno 400mg",
    description: "Antiinflamatorio no esteroideo",
    price: 8.00,
    stock: 200,
    category: "Antiinflamatorios",
    image_url: null,
  },
  {
    id: "3",
    name: "Amoxicilina 500mg",
    description: "Antibiótico de amplio espectro",
    price: 15.00,
    stock: 80,
    category: "Antibióticos",
    image_url: null,
  },
  {
    id: "4",
    name: "Loratadina 10mg",
    description: "Antihistamínico para alergias",
    price: 6.50,
    stock: 120,
    category: "Antihistamínicos",
    image_url: null,
  },
  {
    id: "5",
    name: "Omeprazol 20mg",
    description: "Inhibidor de la bomba de protones",
    price: 12.00,
    stock: 90,
    category: "Gastroenterología",
    image_url: null,
  },
  {
    id: "6",
    name: "Vitamina C 1000mg",
    description: "Suplemento vitamínico",
    price: 10.00,
    stock: 180,
    category: "Vitaminas",
    image_url: null,
  },
];

const CATEGORIES = ["Todos", "Analgésicos", "Antiinflamatorios", "Antibióticos", "Antihistamínicos", "Gastroenterología", "Vitaminas"];

export function CatalogView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
        <p className="mt-2 text-gray-600">
          Explora nuestro catálogo completo de medicamentos y productos
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-6xl">💊</div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="mb-2">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {product.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{product.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    S/ {product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Stock: {product.stock} unidades
                  </p>
                </div>

                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">
            No se encontraron productos que coincidan con tu búsqueda
          </p>
        </Card>
      )}
    </div>
  );
}
