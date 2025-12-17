"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard,
  Package, 
  ShoppingCart, 
  BarChart3, 
  Pill,
  User,
  Crown,
  ChevronLeft,
  ChevronRight,
  FileText
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { isAdmin } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Enlaces de navegación según rol
  const adminLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/catalog", label: "Catálogo", icon: Pill },
    { href: "/dashboard/inventory", label: "Inventario", icon: Package },
    { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingCart },
    { href: "/dashboard/medical-subscriptions", label: "Doctores", icon: User },
    { href: "/dashboard/subscription", label: "Suscripción", icon: Crown },
  ];

  const clientLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/catalog", label: "Catálogo", icon: Pill },
    { href: "/dashboard/my-orders", label: "Mis Pedidos", icon: FileText },
    { href: "/dashboard/cart", label: "Carrito", icon: ShoppingCart },
    { href: "/dashboard/medical-subscriptions", label: "Doctores", icon: User },
    { href: "/dashboard/subscription", label: "Suscripción", icon: Crown },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </button>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100",
                collapsed && "justify-center"
              )}
              title={collapsed ? link.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Role Badge */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className={cn(
            "px-3 py-2 rounded-lg text-xs font-medium text-center",
            isAdmin
              ? "bg-blue-100 text-blue-700"
              : "bg-blue-100 text-blue-700"
          )}>
            {isAdmin ? "👑 Administrador" : "👤 Cliente"}
          </div>
        </div>
      )}
    </aside>
  );
}
