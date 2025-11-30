import { UsersList } from "@/components/users-list";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "All Users" }, { name: "description", content: "Users!" }];
}

export default function Users() {
  return <UsersList />;
}
