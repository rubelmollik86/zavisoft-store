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
    <div className="bg-[#E7E7E3] min-h-screen ">
      {/* Breadcrumb */}
      <div className="border-b border-kicks-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-lg text-black font-body">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-kicks-blue truncate max-w-[300px]">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main product */}
      <div className="bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
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

                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  New Release
                </div>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(i)}
                      className={`relative aspect-square bg-white rounded-md overflow-hidden border transition-all
                  ${
                    selectedImg === i
                      ? "border-gray-900"
                      : "border-transparent hover:border-gray-400"
                  }`}
                    >
                      <Image
                        src={img}
                        alt={`View ${i + 1}`}
                        fill
                        className="object-cover"
                        onError={() =>
                          setImgErrors((p) => ({ ...p, [i]: true }))
                        }
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="bg-[#efefec] rounded-xl p-6 space-y-6">
              <p className="text-gray-500 text-[11px] uppercase tracking-widest">
                {product.category.name}
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <span className="text-blue-600 font-semibold text-lg">
                {formatPrice(product.price)}
              </span>

              {/* Color selector */}
              <div>
                <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-2">
                  Color
                </p>
                <div className="flex items-center gap-3">
                  <button
                    className="w-7 h-7 rounded-full border-2 border-gray-900 flex items-center justify-center"
                    aria-label="Shadow Navy"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#1f2937]" />
                  </button>

                  <button
                    className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center"
                    aria-label="Army Green"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#6b7280]" />
                  </button>
                </div>
              </div>

              {/* About */}
              <div>
                <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-2">
                  About the product
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock info */}
              <div className="bg-blue-50 border border-blue-100 p-3 rounded">
                <p className="text-blue-600 text-[11px] font-semibold uppercase">
                  Don&apos;t miss out!
                </p>
                <p className="text-gray-700 text-xs mt-0.5">
                  Only a few left in stock.
                </p>
              </div>

              {/* Size selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-700 text-xs font-semibold uppercase">
                    Size
                  </p>
                  <button className="text-gray-500 text-xs underline">
                    Size chart
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-sm font-semibold rounded border transition
                  ${
                    selectedSize === size
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                  }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {inCart && (
                <div className="flex items-center gap-2 text-xs text-green-600">
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
                  {qty} pair{qty > 1 ? "s" : ""} in your bag · Size{" "}
                  {selectedSize}
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={adding}
                    className="flex-1 bg-black text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-900 transition disabled:opacity-50"
                  >
                    {adding
                      ? "ADDING..."
                      : added
                        ? "✓ ADDED TO BAG"
                        : "ADD TO CART"}
                  </button>

                  {/* Love / Wishlist */}
                  <button
                    className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-md hover:border-gray-900 transition"
                    aria-label="Add to wishlist"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                     -1.935 0-3.597 1.126-4.312 2.733
                     -.715-1.607-2.377-2.733-4.313-2.733
                     C5.1 3.75 3 5.765 3 8.25
                     c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>

                <Link
                  href="/cart"
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                >
                  BUY IT NOW
                </Link>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-gray-300">
                <div>
                  <p className="text-gray-500 text-[11px] uppercase">
                    Product ID
                  </p>
                  <p className="text-gray-800 text-xs">#{product.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] uppercase">
                    Availability
                  </p>
                  <p className="text-green-600 text-xs">In Stock</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] uppercase">
                    Shipping
                  </p>
                  <p className="text-gray-800 text-xs">
                    {product.price > 100 ? "Free" : "$9.99"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] uppercase">Returns</p>
                  <p className="text-gray-800 text-xs">30 days</p>
                </div>
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
