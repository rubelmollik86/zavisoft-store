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

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
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

  if (variant === "compact") {
    return (
      <Link href={`/products/${product.id}`}>
        <div className="group bg-kicks-gray rounded-lg overflow-hidden hover:bg-kicks-gray-2 transition-colors cursor-pointer">
          <div className="relative w-full aspect-square bg-kicks-gray-2 overflow-hidden">
            <Image src={imageUrl} alt={product.title} fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)} sizes="200px" />
            <div className="absolute top-2 left-2 bg-kicks-blue text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider font-body">
              NEW
            </div>
          </div>
          <div className="p-2.5">
            <p className="text-white text-xs font-semibold font-body line-clamp-2 leading-tight">
              {truncate(product.title, 35)}
            </p>
            <p className="text-kicks-gray-3 text-[10px] mt-0.5 font-body">{product.category.name}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-white text-sm font-bold font-body">{formatPrice(product.price)}</span>
              <button onClick={handleAdd}
                className="bg-kicks-blue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider hover:bg-kicks-blue-light transition-colors font-body">
                {inCart ? "✓" : "+ ADD"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-kicks-gray rounded-lg overflow-hidden hover:bg-kicks-gray-2 transition-all duration-300 cursor-pointer animate-fade-in">
        {/* Image */}
        <div className="relative w-full h-52 bg-kicks-gray-2 overflow-hidden">
          <Image src={imageUrl} alt={product.title} fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
          <div className="absolute top-3 left-3 bg-kicks-blue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider font-body">
            NEW
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest mb-1 font-body">
            {product.category.name}
          </p>
          <h3 className="text-white text-sm font-semibold font-body line-clamp-2 leading-snug">
            {truncate(product.title, 50)}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="text-white font-bold font-body">{formatPrice(product.price)}</span>
            <button onClick={handleAdd} disabled={adding}
              className="bg-kicks-blue text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider hover:bg-kicks-blue-light transition-colors disabled:opacity-50 font-body">
              {adding ? "..." : inCart ? "✓ IN BAG" : "VIEW PRODUCT"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
