"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "ADD"; product: Product; size: string }
  | { type: "REMOVE"; productId: number }
  | { type: "UPDATE_QTY"; productId: number; quantity: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1, size: action.size }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = useCallback(
    (product: Product, size = "US 10") =>
      dispatch({ type: "ADD", product, size }),
    []
  );
  const removeFromCart = useCallback(
    (productId: number) => dispatch({ type: "REMOVE", productId }),
    []
  );
  const updateQuantity = useCallback(
    (productId: number, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", productId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const isInCart = useCallback(
    (productId: number) => state.items.some((i) => i.product.id === productId),
    [state.items]
  );
  const getQuantity = useCallback(
    (productId: number) =>
      state.items.find((i) => i.product.id === productId)?.quantity ?? 0,
    [state.items]
  );

  const total = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
