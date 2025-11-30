import { ProductSearchBar } from "./product-search-bar";
import { ProductSortSelect } from "./product-sort-select";

interface ProductFiltersProps {
  searchValue: string;
  sortValue: string;
  onSearch: (value: string) => void;
  onSort: (field: string) => void;
}

export function ProductFilters({
  searchValue,
  sortValue,
  onSearch,
  onSort,
}: ProductFiltersProps) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <ProductSearchBar initialValue={searchValue} onSearch={onSearch} />
      <ProductSortSelect value={sortValue} onSortChange={onSort} />
    </div>
  );
}
