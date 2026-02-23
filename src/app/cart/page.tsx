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
        <p className="text-black font-black text-sm font-body mt-1">
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
          <span className="w-8 text-center text-black text-xs font-bold font-body">
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
    <div className="bg-[#E7E7E3] min-h-screen">
      {/* ================= SAVING BANNER ================= */}
      <div className="bg-[#efefe9] border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Saving to celebrate
          </h1>

          <p className="text-sm text-gray-600">
            Enjoy up to 60% off thousands of styles during the End of Year sale
            – while supplies last. No code needed.
          </p>

          <p className="text-sm text-gray-700 mt-2">
            <span className="underline cursor-pointer">Join us</span> or{" "}
            <span className="underline cursor-pointer">Sign-in</span>
          </p>
        </div>
      </div>

      {/* ================= PAGE CONTAINER ================= */}
      <div className="bg-[#efefe9] ">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {done ? (
            /* ================= SUCCESS STATE ================= */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-green-100 border border-green-200 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
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

              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                ORDER PLACED!
              </h2>

              <p className="text-gray-600 text-sm mb-8">
                Thanks for shopping with KICKS.
              </p>

              <Link
                href="/"
                className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-900 transition"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : items.length === 0 ? (
            /* ================= EMPTY STATE ================= */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Your bag is empty
              </h2>

              <p className="text-gray-600 text-sm mb-8">
                Explore the latest drops and find your next pair.
              </p>

              <Link
                href="/"
                className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-900 transition"
              >
                SHOP NOW
              </Link>
            </div>
          ) : (
            /* ================= MAIN LAYOUT ================= */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* ================= YOUR BAG ================= */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Your Bag
                    </h1>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    Items in your bag not reserved – check out now to make them
                    yours.
                  </p>

                  <div className="space-y-6">
                    {items.map((item) => (
                      <CartItemRow
                        key={item.product.id}
                        item={item}
                        onRemove={() => removeFromCart(item.product.id)}
                        onUpdateQty={(qty) =>
                          updateQuantity(item.product.id, qty)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= ORDER SUMMARY ================= */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="uppercase text-gray-700">
                        {itemCount} item
                      </span>
                      <span className="font-medium text-black">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-700">Delivery</span>
                      <span className="text-black">
                        {formatPrice(shipping)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-700">Sales Tax</span>
                      <span className="text-black">–</span>
                    </div>

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-300">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(orderTotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full bg-[#232321] text-white py-3 mt-6 font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-60"
                  >
                    {checkingOut ? "PROCESSING..." : "CHECKOUT"}
                  </button>

                  <p className="mt-4 underline text-sm text-black cursor-pointer">
                    Use a promo code
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="bg-kicks-gray border-t border-kicks-gray-2 py-12 mt-10">
          <div className="px-4 sm:px-6 lg:px-8 mx-auto px-4 sm:px-6 lg:px-8">
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
