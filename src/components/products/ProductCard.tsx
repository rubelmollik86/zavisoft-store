"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types";
import { formatPrice, getImage, truncate } from "@/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);
  const inCart = isInCart(product.id);
  const imageUrl = imgError
    ? `https://picsum.photos/400/400?random=${product.id}`
    : getImage(product.images, 0, product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 600);
  };

  /* ─── COMPACT VARIANT ─────────────────────────────────────────── */
  if (variant === "compact") {
    return (
      <Link href={`/products/${product.id}`}>
        <div className="group cursor-pointer flex flex-col">
          {/* Card */}
          <div className="relative bg-[#f5f3ef] rounded-[20px] overflow-hidden">
            {/* Diagonal "New" ribbon */}
            <div className="absolute top-0 left-0 w-[72px] h-[72px] overflow-hidden rounded-tl-2xl z-10 pointer-events-none">
              <span
                className="absolute bg-[#4A90D9] text-white text-[9px] font-bold tracking-wide uppercase text-center"
                style={{
                  width: 100,
                  top: 16,
                  left: -24,
                  transform: "rotate(-45deg)",
                  paddingTop: 3,
                  paddingBottom: 3,
                }}
              >
                New
              </span>
            </div>

            {/* Product image */}
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500 p-3"
                onError={() => setImgError(true)}
                sizes="200px"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-black text-xs font-black uppercase mt-2 leading-tight font-body line-clamp-2">
            {truncate(product.title, 35)}
          </h3>

          {/* CTA button */}
          <button
            onClick={handleAdd}
            className="mt-2 w-full bg-[#1a1a1a] rounded-xl py-2.5 flex items-center justify-center gap-1.5 hover:bg-[#2a2a2a] transition-colors font-body"
          >
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">
              {inCart ? "✓ In Bag" : "+ Add"}
            </span>
            <span className="text-white text-[10px] opacity-60">-</span>
            <span className="text-[#E8A020] text-[10px] font-black">
              {formatPrice(product.price)}
            </span>
          </button>
        </div>
      </Link>
    );
  }

  /* ─── DEFAULT VARIANT ─────────────────────────────────────────── */
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer flex flex-col animate-fade-in">
        {/* Card */}
        <div className="relative bg-[#f5f3ef] rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Diagonal "New" ribbon — top-left corner */}
          <div className="absolute top-0 left-0 w-[90px] h-[90px] overflow-hidden rounded-tl-3xl z-10 pointer-events-none">
            <span
              className="absolute bg-[#4A90D9] text-white text-[11px] font-bold tracking-wide uppercase text-center"
              style={{
                width: 130,
                top: 22,
                left: -32,
                transform: "rotate(-45deg)",
                paddingTop: 5,
                paddingBottom: 5,
                boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
              }}
            >
              New
            </span>
          </div>

          {/* Product image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500 p-6"
              onError={() => setImgError(true)}
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Title — outside card, below */}
        <h3
          className="text-white font-black uppercase text-lg leading-tight mt-4 mb-3 font-body line-clamp-2"
          style={{ letterSpacing: "-0.3px" }}
        >
          {truncate(product.title, 60)}
        </h3>

        {/* CTA button — full width dark pill */}
        <button
          onClick={handleAdd}
          disabled={adding}
          className="w-full bg-[#1a1a1a] rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-[#272727] transition-colors disabled:opacity-50 font-body"
        >
          <span className="text-white text-sm font-bold uppercase tracking-widest">
            {adding ? "..." : inCart ? "✓ In Bag" : "View Product"}
          </span>
          <span className="text-white opacity-50 text-sm">-</span>
          <span className="text-[#E8A020] text-sm font-black">
            {formatPrice(product.price)}
          </span>
        </button>
      </div>
    </Link>
  );
}
