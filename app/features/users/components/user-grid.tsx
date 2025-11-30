import type { IUser } from "@/types/user";
import { UserCard } from "./user-card";

interface UserGridProps {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}

export function UserGrid({ users, onEdit, onDelete }: UserGridProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No users found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
