import type { Metadata } from "next";
import "./globals.css";
import { ProductsProvider } from "@/context/ProductsContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "KICKS — Do It Right",
  description: "Premium sneakers. Do it right.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#E7E7E3] text-white">
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
