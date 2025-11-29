import { LoginForm } from "@/components/login-form";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Login!" },
  ];
}

export default function Login() {
  return <LoginForm />;
}
