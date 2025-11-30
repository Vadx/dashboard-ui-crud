import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { IProduct } from "@/types/product";

interface ProductTableRowProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (id: number) => void;
}

export function ProductTableRow({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-12 w-12 object-cover rounded"
        />
      </TableCell>
      <TableCell className="font-medium">
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </TableCell>
      <TableCell>{product.brand}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Link to={`/products/${product.id}`}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
