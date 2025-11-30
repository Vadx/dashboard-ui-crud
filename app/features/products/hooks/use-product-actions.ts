import { useState } from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import type { IProduct } from "@/types/product";

interface UseProductActionsProps {
  url: string;
}

export function useProductActions({ url }: UseProductActionsProps) {
  const token = useAuthStore((state) => state.token);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleCreate = () => {
    setEditingProduct(null);
    setDrawerOpen(true);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setDrawerOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete || !token) return;

    try {
      await api.deleteProduct(productToDelete, token);
      mutate(url);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product", {
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
    editingProduct,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleCreate,
    handleEdit,
    openDeleteDialog,
    handleDelete,
    handleSuccess,
  };
}
