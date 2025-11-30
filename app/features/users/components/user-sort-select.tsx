import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserSortSelectProps {
  value: string;
  onSortChange: (field: string) => void;
}

export function UserSortSelect({ value, onSortChange }: UserSortSelectProps) {
  return (
    <Select value={value} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="firstName">First Name</SelectItem>
        <SelectItem value="lastName">Last Name</SelectItem>
        <SelectItem value="email">Email</SelectItem>
        <SelectItem value="age">Age</SelectItem>
      </SelectContent>
    </Select>
  );
}
