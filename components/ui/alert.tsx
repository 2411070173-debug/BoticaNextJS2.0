"use client";

import { AlertCircle, CheckCircle, InfoIcon, XCircle } from "lucide-react";

type AlertVariant = "default" | "success" | "error" | "warning" | "info";

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<AlertVariant, string> = {
  default: "bg-gray-100 border-gray-300 text-gray-800",
  success: "bg-green-50 border-green-300 text-green-800",
  error: "bg-red-50 border-red-300 text-red-800",
  warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
  info: "bg-blue-50 border-blue-300 text-blue-800",
};

const icons: Record<AlertVariant, React.ComponentType<any>> = {
  default: InfoIcon,
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: InfoIcon,
};

export function Alert({
  variant = "default",
  children,
  className = "",
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={`flex gap-3 rounded-lg border p-4 ${variants[variant]} ${className}`}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
