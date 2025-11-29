import HomeCards from "@/components/home-cards";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to Dashboard!" },
  ];
}

export default function Home() {
  return <HomeCards />;
}
