import useSWR from "swr";
import { api, fetcher } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { UserDrawerForm } from "@/components/user-drawer-form";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { UserFilters } from "./components/user-filters";
import { UserGrid } from "./components/user-grid";
import { UserPagination } from "./components/user-pagination";
import { UserLoadingSkeleton } from "./components/user-loading-skeleton";
import { useUserParams } from "./hooks/use-user-params";
import { useUserActions } from "./hooks/use-user-actions";

export function UsersList() {
  const {
    page,
    limit,
    search,
    sortBy,
    order,
    updateSearch,
    updateSort,
    updatePage,
  } = useUserParams();

  const skip = (page - 1) * limit;
  const url = api.getUsers(limit, skip, search, sortBy, order);

  const { data, error, isLoading } = useSWR(url, fetcher);

  const {
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
  } = useUserActions({ url });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 italic font-normal">Users</h1>
          <p className="text-slate-600 font-light text-sm">
            Manage system users
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Create User
        </Button>
      </div>

      <Card className="p-6">
        <UserFilters
          searchValue={search}
          sortValue={sortBy}
          onSearch={updateSearch}
          onSort={updateSort}
        />

        {isLoading && <UserLoadingSkeleton count={limit} />}

        {error && (
          <div className="text-center py-8 text-destructive">
            Failed to load users
          </div>
        )}

        {data && (
          <>
            <UserGrid
              users={data.users}
              onEdit={handleEdit}
              onDelete={openDeleteDialog}
            />

            <UserPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={data.total}
              itemsPerPage={limit}
              onPageChange={updatePage}
            />
          </>
        )}
      </Card>

      <UserDrawerForm
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        user={editingUser}
        onSuccess={handleSuccess}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
