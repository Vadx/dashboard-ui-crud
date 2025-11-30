import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortSelectProps {
  value: string;
  onSortChange: (field: string) => void;
}

export function ProductSortSelect({
  value,
  onSortChange,
}: ProductSortSelectProps) {
  return (
    <Select value={value} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="title">Title</SelectItem>
        <SelectItem value="price">Price</SelectItem>
        <SelectItem value="brand">Brand</SelectItem>
        <SelectItem value="category">Category</SelectItem>
      </SelectContent>
    </Select>
  );
}
