import { useAuthStore } from "@/store/auth-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Users, TrendingUp } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";

export function HomeWelcomeCard() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    {
      title: "Total Products",
      value: "194",
      description: "Available in inventory",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      link: "/products",
    },
    {
      title: "Total Users",
      value: "208",
      description: "Active users",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      link: "/users",
    },
    {
      title: "Growth",
      value: "+12.5%",
      description: "From last month",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      link: "/",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-normal text-slate-900 pt-5">
          Welcome back, <span className="font-semibold">{user?.firstName}</span>
          !
        </h1>
        <p className="text-slate-600 mt-1">
          Here's what's happening with your dashboard today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <CardDescription className="text-xs mt-1">
                  {stat.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <NavLink to={stat.link} className="w-full">
                  <Button
                    size="lg"
                    className="w-full font-medium"
                    variant="outline"
                  >
                    See all {stat.title}
                  </Button>
                </NavLink>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
