"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryCard } from "@/components/products/CategoryCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { Footer } from "@/components/layout/Footer";
import { getImage, formatPrice } from "@/utils";

const REVIEWS = [
  {
    id: 1,
    name: "Good Quality",
    rating: 5,
    text: "Exactly what I needed. Top notch comfort and style.",
    avatar: "https://i.pravatar.cc/40?img=1",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Good Quality",
    rating: 5,
    text: "Shipping was fast and the shoes look amazing.",
    avatar: "https://i.pravatar.cc/40?img=5",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Good Quality",
    rating: 5,
    text: "Premium feel. Worth every penny spent on KICKS.",
    avatar: "https://i.pravatar.cc/40?img=10",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 text-kicks-yellow fill-kicks-yellow" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Extracted to avoid hook-in-render
function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      className="bg-kicks-gray border border-kicks-gray-2 rounded-lg overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-36 overflow-hidden">
        <Image
          src={imgErr ? `https://picsum.photos/300/200?random=${review.id + 20}` : review.image}
          alt={review.name}
          fill
          className="object-cover"
          onError={() => setImgErr(true)}
          sizes="300px"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
          <span className="text-white text-[10px] font-body">Verified Buyer</span>
        </div>
      </div>
      <div className="p-3">
        <StarRating />
        <p className="text-white text-xs font-semibold mt-1.5 font-body">{review.name}</p>
        <p className="text-kicks-gray-3 text-xs mt-1 leading-relaxed font-body">{review.text}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { state, fetchAllProducts, fetchAllCategories } = useProducts();
  const [heroImgErr, setHeroImgErr] = useState(false);

  useEffect(() => {
    fetchAllProducts({ limit: 20 });
  }, [fetchAllProducts]);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const featuredProduct = state.products[0];
  const newDrops = state.products.slice(0, 5);
  const featured = state.products.slice(5, 9);

  const heroImg = heroImgErr
    ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop"
    : featuredProduct
    ? getImage(featuredProduct.images, 0, featuredProduct.id)
    : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop";

  return (
    <div className="bg-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[480px] flex">
            {/* Text */}
            <div className="relative z-10 flex flex-col justify-end pb-10 pt-20 flex-1">
              <p className="text-kicks-gray-3 text-xs uppercase tracking-widest mb-3 font-body animate-slide-in-left">
                Nike Air Max · <span className="text-kicks-blue">Featured</span>
              </p>
              <h1 className="font-display font-black leading-none animate-slide-up">
                <span className="block text-white text-[72px] sm:text-[100px] lg:text-[128px] tracking-tight">
                  DO IT
                </span>
                <span className="block text-kicks-blue text-[72px] sm:text-[100px] lg:text-[128px] tracking-tight -mt-4">
                  RIGHT
                </span>
              </h1>

              <div className="mt-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="inline-block bg-kicks-gray border border-kicks-gray-2 p-4 max-w-xs">
                  <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">Featured</p>
                  <p className="text-white font-bold text-sm font-body mt-0.5">NIKE AIR MAX</p>
                  <p className="text-kicks-gray-3 text-xs font-body mt-1">
                    Introducing the new air max for everyday comfort.
                  </p>
                  {featuredProduct && (
                    <p className="text-white font-bold text-sm font-body mt-2">
                      {formatPrice(featuredProduct.price)}
                    </p>
                  )}
                  <Link href={featuredProduct ? `/products/${featuredProduct.id}` : "/products"}>
                    <button className="mt-3 bg-kicks-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 hover:bg-kicks-blue-light transition-colors font-body w-full">
                      SHOP NOW
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-3/5 pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src={heroImg}
                  alt="Hero shoe"
                  fill
                  className="object-cover opacity-70"
                  onError={() => setHeroImgErr(true)}
                  priority
                  sizes="60vw"
                />
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
              </div>
            </div>

            {/* Side thumbnails */}
            {state.products.slice(1, 3).length > 0 && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
                {state.products.slice(1, 3).map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`}>
                    <div className="w-16 h-16 bg-kicks-gray border border-kicks-gray-2 overflow-hidden hover:border-kicks-blue transition-colors">
                      <Image
                        src={getImage(p.images, 0, p.id)}
                        alt={p.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── NEW DROPS ── */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">Don&apos;t miss out</p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
                NEW DROPS
              </h2>
            </div>
            <Link
              href="/products"
              className="w-8 h-8 bg-kicks-blue flex items-center justify-center hover:bg-kicks-blue-light transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {state.status === "loading" || state.status === "idle" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {newDrops.map((p) => <ProductCard key={p.id} product={p} variant="compact" />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-kicks-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
              CATEGORIES
            </h2>
            <div className="flex gap-2">
              <button className="w-7 h-7 border border-kicks-gray-3 flex items-center justify-center text-kicks-gray-3 hover:border-white hover:text-white transition-all">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-7 h-7 border border-kicks-gray-3 flex items-center justify-center text-kicks-gray-3 hover:border-white hover:text-white transition-all">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {state.categoriesStatus === "loading" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 bg-kicks-gray-2 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {state.categories.slice(0, 4).map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
              REVIEWS
            </h2>
            <span className="text-kicks-blue text-xs font-bold font-body">4.9★</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REVIEWS.map((r, idx) => (
              <ReviewCard key={r.id} review={r} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── YOU MAY ALSO LIKE ── */}
      <section className="bg-kicks-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
              YOU MAY ALSO LIKE
            </h2>
            <Link href="/products" className="text-kicks-blue text-xs font-bold font-body hover:underline">
              View all →
            </Link>
          </div>

          {state.status === "loading" || state.status === "idle" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
