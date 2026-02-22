"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  const [err, setErr] = useState(false);
  const img = err
    ? `https://picsum.photos/300/300?random=${category.id + 50}`
    : category.image;

  return (
    <Link href={`/products?category=${category.id}`}>
      <div className="group relative bg-kicks-gray rounded-lg overflow-hidden cursor-pointer hover:ring-1 hover:ring-kicks-blue transition-all">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={img}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setErr(true)}
            sizes="200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          <h3 className="text-white font-bold font-body text-sm uppercase tracking-wide">
            {category.name}
          </h3>
          <div className="w-5 h-5 bg-[#E7E7E3]/10 rounded flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
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
          </div>
        </div>
      </div>
    </Link>
  );
}
