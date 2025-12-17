import { Metadata } from "next";
import { SubscriptionView } from "@/components/subscription/subscription-view";

export const metadata: Metadata = {
  title: "Suscripción | Botica Plus",
  description: "Gestiona tu plan de suscripción",
};

export default function SubscriptionPage() {
  return <SubscriptionView />;
}
