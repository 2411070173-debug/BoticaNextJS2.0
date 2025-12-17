import { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Catálogo | Botica Plus",
  description: "Explora nuestro catálogo de medicamentos y productos",
};

export default function CatalogPage() {
  return <CatalogView />;
}
