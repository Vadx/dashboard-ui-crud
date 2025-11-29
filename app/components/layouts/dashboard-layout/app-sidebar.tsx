import * as React from "react";

import { NavMain } from "@/components/layouts/dashboard-layout/nav-main";
import { NavUser } from "@/components/layouts/dashboard-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import { Home, Bell, ChevronsUpDown } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://avatar.iran.liara.run/public/avatar.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icons: Home,
    },
    {
      title: "Products",
      url: "/products",
      icons: Bell,
    },
    {
      title: "Users",
      url: "/users",
      icons: ChevronsUpDown,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <Logo size="medium" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
