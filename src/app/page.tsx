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
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Good Quality",
    rating: 5,
    text: "Shipping was fast and the shoes look amazing.",
    avatar: "https://i.pravatar.cc/40?img=5",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Good Quality",
    rating: 5,
    text: "Premium feel. Worth every penny spent on KICKS.",
    avatar: "https://i.pravatar.cc/40?img=10",
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3 h-3 text-kicks-yellow fill-kicks-yellow"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Extracted to avoid hook-in-render
function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[0];
  index: number;
}) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      className="bg-kicks-gray border border-kicks-gray-2 rounded-lg overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-36 overflow-hidden">
        <Image
          src={
            imgErr
              ? `https://picsum.photos/300/200?random=${review.id + 20}`
              : review.image
          }
          alt={review.name}
          fill
          className="object-cover"
          onError={() => setImgErr(true)}
          sizes="300px"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#E7E7E3]/60 backdrop-blur-sm rounded px-2 py-1">
          <span className="text-white text-[10px] font-body">
            Verified Buyer
          </span>
        </div>
      </div>
      <div className="p-3">
        <StarRating />
        <p className="text-white text-xs font-semibold mt-1.5 font-body">
          {review.name}
        </p>
        <p className="text-kicks-gray-3 text-xs mt-1 leading-relaxed font-body">
          {review.text}
        </p>
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
    <div className="bg-[#E7E7E3] min-h-screen">
      {/* ── HERO ── */}
      <section className="bg-[#E7E7E3] px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="overflow-hidden mb-3 px-4 sm:px-6 lg:px-8">
          <h1
            className="font-display font-black leading-none whitespace-nowrap animate-slide-up w-full text-center"
            style={{
              fontSize: "clamp(48px, 14vw, 180px)",
              letterSpacing: "-0.02em",
              wordSpacing: "0.2em",
            }}
          >
            <span className="text-[#1a1a1a]">DO IT </span>
            <span className="text-kicks-blue">RIGHT</span>
          </h1>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ minHeight: 580 }}
        >
          <Image
            src={heroImg}
            alt="Hero shoe"
            fill
            className="object-cover"
            onError={() => setHeroImgErr(true)}
            priority
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <div
              className="bg-black/70 text-white text-[9px] font-body uppercase tracking-widest px-2 py-3"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Nike product of the year
            </div>
          </div>

          <div className="absolute bottom-8 left-10 z-10 max-w-sm">
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight leading-none mb-2">
              NIKE AIR MAX
            </h2>
            <p className="text-white/80 text-sm font-body mb-5 leading-relaxed">
              Nike introducing the new air max for everyone&apos;s comfort
            </p>
            <Link
              href={
                featuredProduct
                  ? `/products/${featuredProduct.id}`
                  : "/products"
              }
            >
              <button className="bg-kicks-blue text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 hover:bg-kicks-blue-light transition-colors font-body rounded-sm">
                SHOP NOW
              </button>
            </Link>
          </div>

          {/* Right thumbnails */}
          {state.products.slice(1, 3).length > 0 && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
              {state.products.slice(1, 3).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 hover:border-white transition-colors shadow-xl">
                    <Image
                      src={getImage(p.images, 0, p.id)}
                      alt={p.title}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEW DROPS ── */}
      <section className="bg-[#E7E7E3] py-12">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-kicks-gray-3 text-[12px] uppercase tracking-widest font-body">
                Don&apos;t miss out
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-[#232321] tracking-tight">
                NEW DROPS
              </h2>
            </div>
            <Link
              href="/products"
              className="p-1 flex items-center justify-center hover:bg-kicks-blue-light transition-colors rounded-[8px] bg-[#4A69E2]"
            >
              <h4>Shop New Drops</h4>
            </Link>
          </div>

          {state.status === "loading" || state.status === "idle" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {newDrops.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-kicks-gray py-10">
        {/* Header — padded */}
        <div className="px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight uppercase">
              CATEGORIES
            </h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-[#3a3a3a] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#4a4a4a] transition-all rounded-lg">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 bg-[#3a3a3a] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#4a4a4a] transition-all rounded-lg">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
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
        </div>

        {/* Cards — left-padded only, right bleeds to edge */}
        <div className="pl-4 sm:pl-6 lg:pl-8 overflow-hidden">
          {state.categoriesStatus === "loading" ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse bg-[#2a2a2a] rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {state.categories.slice(0, 2).map((cat, i) => (
                <Link key={cat.id} href={`/products?category=${cat.id}`}>
                  <div
                    className={`relative bg-[#f0f0ee] overflow-hidden group cursor-pointer`}
                    style={{
                      borderRadius:
                        i === 0 ? "24px 24px 24px 24px" : "24px 0px 0px 24px",
                      minHeight: 420,
                    }}
                  >
                    {/* Shoe image — centered */}
                    <div className="relative w-full h-72 flex items-center justify-center p-6">
                      <Image
                        src={getImage(cat.image ? [cat.image] : [], 0, cat.id)}
                        alt={cat.name}
                        fill
                        className="object-contain p-8"
                        sizes="50vw"
                      />
                    </div>

                    {/* Bottom: name + arrow */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                      <h3 className="font-display font-black text-[#1a1a1a] text-2xl leading-tight uppercase">
                        {cat.name.replace(" ", "\n")}
                      </h3>
                      <div className="w-11 h-11 bg-[#1a1a1a] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-kicks-blue transition-colors">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7v10"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-[#E7E7E3] py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-5xl md:text-6xl text-[#1a1a1a] tracking-tight uppercase">
              REVIEWS
            </h2>
            <button className="bg-kicks-blue text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-lg hover:bg-kicks-blue-light transition-colors font-body">
              SEE ALL
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REVIEWS.map((r, idx) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl overflow-hidden flex flex-col animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Top: text content */}
                <div className="p-5 flex flex-col gap-2">
                  {/* Name + Avatar row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[#1a1a1a] font-black text-base font-body">
                        {r.name}
                      </p>
                      <p className="text-gray-500 text-sm font-body mt-0.5 leading-snug">
                        I highly recommend shopping from kicks
                      </p>
                    </div>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                      <Image
                        src={r.avatar}
                        alt="reviewer"
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </div>

                  {/* Stars + rating */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-kicks-yellow text-kicks-yellow"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm font-body font-semibold">
                      5.0
                    </span>
                  </div>
                </div>

                {/* Bottom: full-width image */}
                <div
                  className="relative w-full flex-1"
                  style={{ minHeight: 220 }}
                >
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOU MAY ALSO LIKE ── */}
      <section className="bg-kicks-gray py-12">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
              YOU MAY ALSO LIKE
            </h2>
            <Link
              href="/products"
              className="text-kicks-blue text-xs font-bold font-body hover:underline"
            >
              View all →
            </Link>
          </div>

          {state.status === "loading" || state.status === "idle" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
