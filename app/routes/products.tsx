import { ProductsList } from "@/features/products";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Products" },
    { name: "description", content: "Products!" },
  ];
}

export default function Products() {
  return <ProductsList />;
}
