import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Users" },
    { name: "description", content: "Users!" },
  ];
}

export default function Users() {
  return <>Users</>;
}
