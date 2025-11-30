import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import type { IUser } from "@/types/user";

interface UserCardProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image} alt={user.firstName} />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="truncate text-ellipsis break-all text-xs">
                {user.email}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Age</span>
          <span className="font-medium">{user.age}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Phone</span>
          <span className="font-medium">{user.phone}</span>
        </div>
        {user.company && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Company</span>
              <span className="font-medium">{user.company.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Title</span>
              <span className="font-medium">{user.company.title}</span>
            </div>
          </>
        )}
        {user.role && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Role</span>
            <Badge variant="secondary">{user.role}</Badge>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(user)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(user.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
