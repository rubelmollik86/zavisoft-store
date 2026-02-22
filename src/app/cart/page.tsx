"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/products/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { formatPrice, getImage } from "@/utils";
import { Footer } from "@/components/layout/Footer";
import { CartItem } from "@/types";

// Extracted as a proper component so hooks are used legally
function CartItemRow({
  item,
  onRemove,
  onUpdateQty,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQty: (qty: number) => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const img = imgErr
    ? `https://picsum.photos/80/80?random=${item.product.id}`
    : getImage(item.product.images, 0, item.product.id);

  return (
    <div className="flex items-start gap-4 py-5 border-b border-kicks-gray-2 animate-fade-in">
      <div className="relative w-20 h-20 bg-kicks-gray flex-shrink-0 overflow-hidden">
        <Image
          src={img}
          alt={item.product.title}
          fill
          className="object-cover"
          onError={() => setImgErr(true)}
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-kicks-gray-3 text-[10px] uppercase tracking-widest font-body">
          {item.product.category.name}
        </p>
        <h3 className="text-white text-sm font-bold font-body mt-0.5 line-clamp-2 leading-snug">
          {item.product.title}
        </h3>
        <p className="text-kicks-gray-3 text-xs font-body mt-1">
          Size: {item.size}
        </p>
        <p className="text-white font-black text-sm font-body mt-1">
          {formatPrice(item.product.price)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <button
          onClick={onRemove}
          className="text-kicks-gray-3 hover:text-red-400 transition-colors"
          aria-label="Remove item"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-center border border-kicks-gray-2">
          <button
            onClick={() => onUpdateQty(item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center text-kicks-gray-3 hover:text-white hover:bg-kicks-gray transition-colors font-body text-sm"
          >
            −
          </button>
          <span className="w-8 text-center text-white text-xs font-bold font-body">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQty(item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center text-kicks-gray-3 hover:text-white hover:bg-kicks-gray transition-colors font-body text-sm"
          >
            +
          </button>
        </div>

        <p className="text-white font-black text-sm font-body">
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}

// Extracted as component so it can use useState legally
function OrderItemPreview({ item }: { item: CartItem }) {
  const [imgErr, setImgErr] = useState(false);
  const img = imgErr
    ? `https://picsum.photos/56/56?random=${item.product.id + 99}`
    : getImage(item.product.images, 0, item.product.id);

  return (
    <div className="flex items-center gap-3 mb-3 bg-kicks-gray p-3">
      <div className="relative w-14 h-14 bg-kicks-gray-2 flex-shrink-0">
        <Image
          src={img}
          alt={item.product.title}
          fill
          className="object-cover"
          onError={() => setImgErr(true)}
          sizes="56px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-bold font-body line-clamp-2">
          {item.product.title}
        </p>
        <p className="text-kicks-gray-3 text-[10px] font-body">
          Size: {item.size} · Qty: {item.quantity}
        </p>
      </div>
      <p className="text-white text-xs font-bold font-body flex-shrink-0">
        {formatPrice(item.product.price * item.quantity)}
      </p>
    </div>
  );
}

export default function CartPage() {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const { state } = useProducts();
  const [checkingOut, setCheckingOut] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = total;
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const orderTotal = subtotal + tax + shipping;

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setDone(true);
      clearCart();
    }, 2000);
  };

  const related = state.products
    .filter((p) => !items.find((i) => i.product.id === p.id))
    .slice(0, 4);

  return (
    <div className="bg-black min-h-screen">
      {/* Saving banner */}
      <div className="bg-kicks-gray border-b border-kicks-gray-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <span className="text-xs text-kicks-gray-3 font-body">
            Saving to celebrate —{" "}
            <span className="text-white font-semibold">
              We&apos;ll remind you when something special is coming up.
            </span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {done ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center py-24 text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="font-display font-black text-4xl text-white mb-2">
              ORDER PLACED!
            </h2>
            <p className="text-kicks-gray-3 text-sm font-body mb-8">
              Thanks for shopping with KICKS.
            </p>
            <Link
              href="/"
              className="bg-kicks-blue text-white px-8 py-3 font-display font-black text-sm uppercase tracking-widest hover:bg-kicks-blue-light transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display font-black text-6xl text-kicks-gray-2 mb-4">
              BAG
            </p>
            <h2 className="font-display font-black text-4xl text-white mb-3">
              YOUR BAG IS EMPTY
            </h2>
            <p className="text-kicks-gray-3 text-sm font-body mb-8">
              Explore the latest drops and find your next pair.
            </p>
            <Link
              href="/"
              className="bg-kicks-blue text-white px-8 py-3 font-display font-black text-sm uppercase tracking-widest hover:bg-kicks-blue-light transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Your Bag */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display font-black text-4xl text-white tracking-tight">
                  YOUR BAG
                </h1>
                <span className="text-kicks-gray-3 text-xs font-body">
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </span>
              </div>

              <div>
                {items.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onRemove={() => removeFromCart(item.product.id)}
                    onUpdateQty={(qty) => updateQuantity(item.product.id, qty)}
                  />
                ))}
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-widest text-kicks-blue hover:text-kicks-blue-light transition-colors font-body"
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <h2 className="font-display font-black text-3xl text-white tracking-tight mb-6">
                  ORDER SUMMARY
                </h2>

                {/* Item previews — using proper component */}
                {items.slice(0, 2).map((item) => (
                  <OrderItemPreview key={item.product.id} item={item} />
                ))}
                {items.length > 2 && (
                  <p className="text-kicks-gray-3 text-xs font-body mb-3">
                    +{items.length - 2} more item
                    {items.length - 2 !== 1 ? "s" : ""}
                  </p>
                )}

                {/* Promo code */}
                <div className="flex gap-2 mb-6 mt-4">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-kicks-gray border border-kicks-gray-2 text-white placeholder-kicks-gray-3 text-xs px-3 py-2 focus:outline-none focus:border-kicks-blue font-body"
                  />
                  <button className="bg-kicks-gray border border-kicks-gray-2 text-white text-xs px-3 py-2 font-bold uppercase tracking-widest hover:border-kicks-gray-3 transition-colors font-body">
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-kicks-gray-2 pt-5">
                  {[
                    { label: "Subtotal", value: formatPrice(subtotal) },
                    { label: "Sales Tax", value: formatPrice(tax) },
                    {
                      label: "Shipping",
                      value: shipping === 0 ? "FREE" : formatPrice(shipping),
                      green: shipping === 0,
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-kicks-gray-3 text-xs font-body uppercase tracking-wider">
                        {row.label}
                      </span>
                      <span
                        className={`text-xs font-bold font-body ${
                          row.green ? "text-green-400" : "text-white"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-kicks-gray-2 pt-3">
                    <span className="text-white font-black font-body uppercase tracking-wider text-sm">
                      Total
                    </span>
                    <span className="text-white font-black font-body text-sm">
                      {formatPrice(orderTotal)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full bg-kicks-blue text-white font-display font-black text-sm uppercase tracking-widest py-4 mt-6 hover:bg-kicks-blue-light transition-colors disabled:opacity-70"
                >
                  {checkingOut ? "PROCESSING..." : "CHECKOUT →"}
                </button>

                {shipping > 0 && (
                  <p className="text-kicks-gray-3 text-[10px] text-center mt-3 font-body">
                    Add {formatPrice(100 - subtotal)} more for free shipping!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="bg-kicks-gray border-t border-kicks-gray-2 py-12 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-black text-3xl text-white mb-6">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
