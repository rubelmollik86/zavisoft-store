import { Product, LoadingState } from "@/types";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  status: LoadingState;
  error?: string | null;
  onRetry?: () => void;
  variant?: "default" | "compact";
  columns?: "3" | "4" | "5";
  skeletonCount?: number;
}

const colClass = {
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  "5": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
};

export function ProductGrid({
  products, status, error, onRetry,
  variant = "default", columns = "4", skeletonCount = 8,
}: ProductGridProps) {
  if (status === "loading" || status === "idle") {
    return (
      <div className={`grid ${colClass[columns]} gap-4`}>
        {Array.from({ length: skeletonCount }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }

  if (status === "failed") {
    return <ErrorState message={error ?? undefined} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try adjusting your search or category filter."
        action={
          <Link href="/products"
            className="bg-kicks-blue text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-kicks-blue-light transition-colors font-body">
            All Products
          </Link>
        }
      />
    );
  }

  return (
    <div className={`grid ${colClass[columns]} gap-4`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} variant={variant} />
      ))}
    </div>
  );
}
