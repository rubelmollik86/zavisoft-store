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
    <header className="sticky top-4 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#EDEDED] rounded-2xl px-5 h-16 flex items-center relative shadow-sm">
          {/* ✅ Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* ✅ Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 ml-6">
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

          {/* ✅ Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-3xl font-black tracking-tight text-[#232321]">
              KICKS
            </span>
          </Link>

          {/* ✅ Right Icons */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Account */}
            <button className="text-gray-800">
              <svg
                className="w-6 h-6"
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
              <span className="absolute -top-2 -right-2 bg-orange-400 text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </Link>
          </div>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-3 bg-[#EDEDED] rounded-2xl shadow-sm py-4 px-5 space-y-3 animate-slide-up">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-semibold text-gray-700 hover:text-black"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
