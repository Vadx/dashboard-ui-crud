import type { Route } from "./+types/home";
import { HomeWelcomeCard } from "@/components/home-welcome-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to Dashboard!" },
  ];
}

export default function Home() {
  return (
    <>
      <HomeWelcomeCard />
    </>
  );
}
