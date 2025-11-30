import { useState } from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import type { IUser } from "@/types/user";

interface UseUserActionsProps {
  url: string;
}

export function useUserActions({ url }: UseUserActionsProps) {
  const token = useAuthStore((state) => state.token);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleCreate = () => {
    setEditingUser(null);
    setDrawerOpen(true);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setDrawerOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete || !token) return;

    try {
      await api.deleteUser(userToDelete, token);
      mutate(url);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user", {
        description: `${(error as Error).message}`,
      });
    }
  };

  const handleSuccess = () => {
    mutate(url);
  };

  return {
    drawerOpen,
    setDrawerOpen,
    editingUser,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleCreate,
    handleEdit,
    openDeleteDialog,
    handleDelete,
    handleSuccess,
  };
}
