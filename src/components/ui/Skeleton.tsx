import { cn } from "@/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-kicks-gray-2 rounded", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-kicks-gray rounded-lg overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-7 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="aspect-square rounded" />)}
          </div>
        </div>
        <div className="space-y-5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-28" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <Skeleton className="h-12 w-full rounded" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full h-[480px] animate-pulse bg-kicks-gray" />
  );
}
