import { ProductDetails } from "@/components/product-details";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Details" },
    { name: "description", content: "Product Details!" },
  ];
}

export default function Products() {
  return <ProductDetails />;
}
