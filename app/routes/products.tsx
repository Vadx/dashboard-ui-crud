import { ProductsList } from "@/components/products-list";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Products" },
    { name: "description", content: "Products!" },
  ];
}

export default function Products() {
  return <ProductsList />;
}
