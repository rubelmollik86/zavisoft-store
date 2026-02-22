"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/products/ProductCard";
import {
  ProductDetailSkeleton,
  ProductCardSkeleton,
} from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Footer } from "@/components/layout/Footer";
import { formatPrice, getImage } from "@/utils";

const SIZES = ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];

// Next.js 15+: params is a Promise
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { state, fetchSingleProduct, fetchAllProducts } = useProducts();
  const { addToCart, isInCart, getQuantity } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("US 10");
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchSingleProduct(Number(id));
    setSelectedImg(0);
    setAdded(false);
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    if (state.products.length === 0) {
      fetchAllProducts({ limit: 8 });
    }
  }, [state.products.length, fetchAllProducts]);

  const product = state.selectedProduct;
  const inCart = product ? isInCart(product.id) : false;
  const qty = product ? getQuantity(product.id) : 0;
  const related = state.products.filter((p) => p.id !== Number(id)).slice(0, 4);

  const handleAdd = () => {
    if (!product) return;
    setAdding(true);
    addToCart(product, selectedSize);
    setTimeout(() => {
      setAdding(false);
      setAdded(true);
    }, 600);
  };

  if (state.selectedStatus === "loading" || state.selectedStatus === "idle") {
    return (
      <div className="bg-[#E7E7E3]">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (state.selectedStatus === "failed" || !product) {
    return (
      <div className="bg-[#E7E7E3] min-h-screen flex items-center justify-center">
        <ErrorState
          message={state.error ?? "Product not found"}
          onRetry={() => fetchSingleProduct(Number(id))}
        />
      </div>
    );
  }

  const images = product.images.map((raw, i) => {
    if (imgErrors[i])
      return `https://picsum.photos/600/600?random=${product.id + i + 10}`;
    return getImage([raw], 0, product.id + i);
  });
  const mainImg =
    images[selectedImg] || `https://picsum.photos/600/600?random=${product.id}`;

  return (
    <div className="bg-[#E7E7E3] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-kicks-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-kicks-gray-3 font-body">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-3 animate-slide-in-left">
            <div className="relative aspect-square bg-kicks-gray overflow-hidden">
              <Image
                src={mainImg}
                alt={product.title}
                fill
                className="object-cover"
                priority
                onError={() =>
                  setImgErrors((p) => ({ ...p, [selectedImg]: true }))
                }
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute top-3 left-3 bg-kicks-blue text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest font-body">
                NEW
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`relative aspect-square bg-kicks-gray overflow-hidden border-2 transition-all ${
                      selectedImg === i
                        ? "border-kicks-blue"
                        : "border-transparent hover:border-kicks-gray-3"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      className="object-cover"
                      onError={() => setImgErrors((p) => ({ ...p, [i]: true }))}
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5 animate-slide-up">
            <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">
              {product.category.name}
            </p>

            <h1 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight leading-tight">
              {product.title.toUpperCase()}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-white font-black font-display text-4xl">
                {formatPrice(product.price)}
              </span>
            </div>

            <div>
              <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body mb-2">
                About the product
              </p>
              <p className="text-kicks-gray-3 text-sm leading-relaxed font-body">
                {product.description}
              </p>
            </div>

            <div className="bg-kicks-blue/10 border border-kicks-blue/20 p-3">
              <p className="text-kicks-blue text-[10px] font-bold uppercase tracking-widest font-body">
                Don&apos;t miss out!
              </p>
              <p className="text-white text-xs font-body mt-0.5">
                Only a few left in stock.
              </p>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-xs font-bold uppercase tracking-widest font-body">
                  Select Size
                </p>
                <button className="text-kicks-blue text-[10px] font-body hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 text-xs font-bold font-body uppercase transition-all ${
                      selectedSize === size
                        ? "bg-kicks-blue text-white"
                        : "bg-kicks-gray border border-kicks-gray-2 text-kicks-gray-3 hover:border-kicks-gray-3 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {inCart && (
              <div className="flex items-center gap-2 text-xs text-kicks-yellow font-body animate-fade-in">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {qty} pair{qty > 1 ? "s" : ""} in your bag · Size {selectedSize}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={adding}
                className="flex-1 bg-kicks-blue text-white font-black text-sm uppercase tracking-widest py-4 hover:bg-kicks-blue-light transition-colors disabled:opacity-50 font-display"
              >
                {adding ? "ADDING..." : added ? "✓ ADDED TO BAG" : "ADD TO BAG"}
              </button>
              <Link
                href="/cart"
                className="flex-1 border border-kicks-gray-3 text-white font-black text-sm uppercase tracking-widest py-4 text-center hover:border-white transition-colors font-display"
              >
                VIEW BAG
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-kicks-gray-2 pt-5">
              <div>
                <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">
                  Product ID
                </p>
                <p className="text-white text-xs font-body mt-0.5">
                  #{product.id}
                </p>
              </div>
              <div>
                <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">
                  Availability
                </p>
                <p className="text-green-400 text-xs font-body mt-0.5">
                  In Stock
                </p>
              </div>
              <div>
                <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">
                  Shipping
                </p>
                <p className="text-white text-xs font-body mt-0.5">
                  {product.price > 100 ? "Free" : "$9.99"}
                </p>
              </div>
              <div>
                <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">
                  Returns
                </p>
                <p className="text-white text-xs font-body mt-0.5">30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <section className="bg-kicks-gray border-t border-kicks-gray-2 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-3xl text-white tracking-tight">
              YOU MAY ALSO LIKE
            </h2>
            <div className="flex gap-2">
              <button className="w-7 h-7 border border-kicks-gray-3 flex items-center justify-center text-kicks-gray-3 hover:border-white hover:text-white transition-all">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="w-7 h-7 border border-kicks-gray-3 flex items-center justify-center text-kicks-gray-3 hover:border-white hover:text-white transition-all">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {state.status === "loading"
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
