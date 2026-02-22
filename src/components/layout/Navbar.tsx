"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/utils";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "New Drops 🔥" },
    { href: "/products", label: "Men ▾" },
    { href: "/products?category=2", label: "Women ▾" },
  ];

  return (
    <header className="sticky top-4 z-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Rounded navbar container */}
        <div className="bg-[#EDEDED] rounded-2xl px-6 h-16 flex items-center relative shadow-sm">
          {/* Left Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-semibold text-gray-700 hover:text-black transition-colors",
                  pathname === l.href && "text-black",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-3xl font-black tracking-tight text-black">
              KICKS
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-5 ml-auto">
            {/* Search */}
            <button className="text-gray-700 hover:text-black transition">
              <svg
                className="w-5 h-5"
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
            </button>

            {/* Account */}
            <button className="text-gray-700 hover:text-black transition">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <svg
                className="w-5 h-5 text-gray-700 hover:text-black transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              {/* Orange Badge */}
              <span className="absolute -top-2 -right-2 bg-orange-400 text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
