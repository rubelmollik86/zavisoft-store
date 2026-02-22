"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryCard } from "@/components/products/CategoryCard";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/utils";

function ProductsContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category");

  const {
    state,
    filteredProducts,
    fetchAllProducts,
    fetchAllCategories,
    setSearch,
    setCategory,
    clearFilters,
  } = useProducts();

  useEffect(() => {
    fetchAllProducts({ limit: 20 });
  }, [fetchAllProducts]);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  useEffect(() => {
    if (catParam) setCategory(Number(catParam));
    else setCategory(null);
  }, [catParam, setCategory]);

  return (
    <div className="bg-black min-h-screen">
      {/* Page header */}
      <div className="bg-kicks-gray border-b border-kicks-gray-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display font-black text-5xl md:text-6xl text-white tracking-tight">
            ALL PRODUCTS
          </h1>
          <p className="text-kicks-gray-3 text-sm font-body mt-1">
            {state.status === "succeeded"
              ? `${filteredProducts.length} products found`
              : "Loading products..."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kicks-gray-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={state.filters.searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-kicks-gray border border-kicks-gray-2 text-white placeholder-kicks-gray-3 text-sm focus:outline-none focus:border-kicks-blue font-body"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => clearFilters()}
              className={cn(
                "px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors font-body",
                !state.filters.categoryId
                  ? "bg-kicks-blue text-white"
                  : "bg-kicks-gray text-kicks-gray-3 hover:text-white border border-kicks-gray-2"
              )}
            >
              All
            </button>
            {state.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setCategory(
                    state.filters.categoryId === cat.id ? null : cat.id
                  )
                }
                className={cn(
                  "px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors font-body",
                  state.filters.categoryId === cat.id
                    ? "bg-kicks-blue text-white"
                    : "bg-kicks-gray text-kicks-gray-3 hover:text-white border border-kicks-gray-2"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          status={state.status}
          error={state.error}
          onRetry={() => fetchAllProducts({ limit: 20 })}
          columns="4"
        />
      </div>

      {state.categories.length > 0 && (
        <section className="bg-kicks-gray border-t border-kicks-gray-2 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-black text-3xl text-white mb-6">
              CATEGORIES
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {state.categories.map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-kicks-gray-3 font-display font-black text-4xl">
          LOADING...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
