import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { Users, SquareChartGantt } from "lucide-react";

const navList = [
  {
    title: "Products",
    description: "See all products available",
    content: "Card Content",
    action: "Card Action",
    link: "/products",
    icons: SquareChartGantt,
  },
  {
    title: "Users",
    description: "See all users available",
    content: "More Content",
    action: "More Action",
    link: "/users",
    icons: Users,
  },
];

const HomeCards = () => {
  return (
    <div className="flex justify-between gap-x-4 mx-auto py-8 flex-col lg:flex-row">
      {navList.map((card, index) => (
        <Card key={index} className="mb-4 shadow-none w-full min-w-sm">
          <CardHeader className="text-center">
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <card.icons className="mx-auto mb-4 mt-2 h-16 w-16 text-muted-foreground" />
          </CardContent>
          <CardFooter>
            <NavLink to={card.link} className="w-full">
              <Button size="lg" className="w-full font-medium">
                See all {card.title}
              </Button>
            </NavLink>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HomeCards;
