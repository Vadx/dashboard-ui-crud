import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layouts/dashboard-layout/index.tsx", [
    index("routes/home.tsx"),
    route("products", "routes/products.tsx"),
    route("users", "routes/users.tsx"),
  ]),
  layout("components/layouts/auth-layout/index.tsx", [
    route("login", "routes/login.tsx"),
  ]),
] satisfies RouteConfig;
