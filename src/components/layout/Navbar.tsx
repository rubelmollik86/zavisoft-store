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
    { href: "/", label: "New Drops" },
    { href: "/products", label: "Men" },
    { href: "/products?category=2", label: "Women" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-kicks-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-14">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-xs font-semibold tracking-widest uppercase font-body transition-colors",
                  pathname === l.href ? "text-white" : "text-kicks-gray-3 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-display font-black text-2xl tracking-tight text-white">
              KICKS<sup className="text-kicks-blue text-xs ml-0.5">®</sup>
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="p-1.5 text-kicks-gray-3 hover:text-white transition-colors" title="Search">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-1.5 text-kicks-gray-3 hover:text-white transition-colors" title="Account">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <Link href="/cart" className="relative p-1.5 text-kicks-gray-3 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-kicks-blue text-white text-[9px] rounded-full flex items-center justify-center font-bold animate-scale-in">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <div className="w-7 h-7 rounded-full bg-kicks-yellow flex items-center justify-center text-black text-[11px] font-black">
              K
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1.5 text-kicks-gray-3 hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-kicks-gray py-3 animate-slide-up">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block px-2 py-2.5 text-sm font-semibold uppercase tracking-widest text-kicks-gray-3 hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
