import { Metadata } from "next";
import { MedicalSubscriptionsView } from "@/components/medical/medical-subscriptions-view";

export const metadata: Metadata = {
  title: "Suscripciones Médicas | Botica Plus",
  description: "Consultas médicas con profesionales certificados",
};

export default function MedicalSubscriptionsPage() {
  return <MedicalSubscriptionsView />;
}
