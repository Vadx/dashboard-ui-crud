import { useParams, Link } from "react-router";
import useSWR from "swr";
import { api, fetcher } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, DollarSign, Tag, Box } from "lucide-react";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? api.getProduct(id) : null, fetcher);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-destructive mb-4">Failed to load product details</p>
        <Link to="/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
          <p className="text-slate-600 font-light text-sm">Product Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.slice(0, 4).map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Price</p>
                  <p className="text-2xl font-bold">${product.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <Box className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Stock</p>
                  <p className="text-xl font-semibold">{product.stock} units</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Category</p>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Brand</p>
                  <p className="text-lg font-medium">{product.brand}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.rating && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Rating</span>
                  <span className="font-medium">{product.rating} / 5</span>
                </div>
              )}
              {product.discountPercentage && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Discount</span>
                  <span className="font-medium text-green-600">
                    {product.discountPercentage}% off
                  </span>
                </div>
              )}
              {product.warrantyInformation && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Warranty</span>
                  <span className="font-medium">
                    {product.warrantyInformation}
                  </span>
                </div>
              )}
              {product.shippingInformation && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium">
                    {product.shippingInformation}
                  </span>
                </div>
              )}
              {product.availabilityStatus && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Availability</span>
                  <Badge variant="outline">{product.availabilityStatus}</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
