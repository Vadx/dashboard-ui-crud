import useSWR from "swr";
import { api, fetcher } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ProductDrawerForm } from "@/components/product-drawer-form";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import SkeletonList from "@/components/ui/skeleton-list";
import { ProductFilters } from "./components/product-filters";
import { ProductTable } from "./components/product-table";
import { ProductPagination } from "./components/product-pagination";
import { useProductParams } from "./hooks/use-product-params";
import { useProductActions } from "./hooks/use-product-actions";

export function ProductsList() {
  const {
    page,
    limit,
    search,
    sortBy,
    order,
    updateSearch,
    updateSort,
    updatePage,
  } = useProductParams();

  const skip = (page - 1) * limit;
  const url = api.getProducts(limit, skip, search, sortBy, order);

  const { data, error, isLoading } = useSWR(url, fetcher);

  const {
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
  } = useProductActions({ url });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 italic font-normal">
            Products
          </h1>
          <p className="text-slate-600 font-light text-sm">
            Manage your product inventory
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Product
        </Button>
      </div>

      <Card className="p-6">
        <ProductFilters
          searchValue={search}
          sortValue={sortBy}
          onSearch={updateSearch}
          onSort={updateSort}
        />

        {isLoading && <SkeletonList items={10} />}

        {error && (
          <div className="text-center py-8 text-destructive">
            Failed to load products
          </div>
        )}

        {data && (
          <>
            <ProductTable
              products={data.products}
              onEdit={handleEdit}
              onDelete={openDeleteDialog}
            />

            <ProductPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={data.total}
              itemsPerPage={limit}
              onPageChange={updatePage}
            />
          </>
        )}
      </Card>

      <ProductDrawerForm
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        product={editingProduct}
        onSuccess={handleSuccess}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
