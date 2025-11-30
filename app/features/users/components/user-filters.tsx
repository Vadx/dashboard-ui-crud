import { UserSearchBar } from "./user-search-bar";
import { UserSortSelect } from "./user-sort-select";

interface UserFiltersProps {
  searchValue: string;
  sortValue: string;
  onSearch: (value: string) => void;
  onSort: (field: string) => void;
}

export function UserFilters({
  searchValue,
  sortValue,
  onSearch,
  onSort,
}: UserFiltersProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <UserSearchBar initialValue={searchValue} onSearch={onSearch} />
      <UserSortSelect value={sortValue} onSortChange={onSort} />
    </div>
  );
}
