"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { Product, Category, LoadingState } from "@/types";
import { productsApi, categoriesApi } from "@/services/api";

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  categories: Category[];
  status: LoadingState;
  selectedStatus: LoadingState;
  categoriesStatus: LoadingState;
  error: string | null;
  filters: {
    categoryId: number | null;
    searchQuery: string;
  };
}

type Action =
  | { type: "FETCH_PRODUCTS_START" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_PRODUCTS_ERROR"; payload: string }
  | { type: "FETCH_PRODUCT_START" }
  | { type: "FETCH_PRODUCT_SUCCESS"; payload: Product }
  | { type: "FETCH_PRODUCT_ERROR"; payload: string }
  | { type: "FETCH_CATEGORIES_START" }
  | { type: "FETCH_CATEGORIES_SUCCESS"; payload: Category[] }
  | { type: "FETCH_CATEGORIES_ERROR" }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORY"; payload: number | null }
  | { type: "CLEAR_FILTERS" };

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  categories: [],
  status: "idle",
  selectedStatus: "idle",
  categoriesStatus: "idle",
  error: null,
  filters: { categoryId: null, searchQuery: "" },
};

function reducer(state: ProductsState, action: Action): ProductsState {
  switch (action.type) {
    case "FETCH_PRODUCTS_START":
      return { ...state, status: "loading", error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, status: "succeeded", products: action.payload };
    case "FETCH_PRODUCTS_ERROR":
      return { ...state, status: "failed", error: action.payload };
    case "FETCH_PRODUCT_START":
      return { ...state, selectedStatus: "loading", selectedProduct: null };
    case "FETCH_PRODUCT_SUCCESS":
      return { ...state, selectedStatus: "succeeded", selectedProduct: action.payload };
    case "FETCH_PRODUCT_ERROR":
      return { ...state, selectedStatus: "failed", error: action.payload };
    case "FETCH_CATEGORIES_START":
      return { ...state, categoriesStatus: "loading" };
    case "FETCH_CATEGORIES_SUCCESS":
      return { ...state, categoriesStatus: "succeeded", categories: action.payload };
    case "FETCH_CATEGORIES_ERROR":
      return { ...state, categoriesStatus: "failed" };
    case "SET_SEARCH":
      return { ...state, filters: { ...state.filters, searchQuery: action.payload } };
    case "SET_CATEGORY":
      return { ...state, filters: { ...state.filters, categoryId: action.payload } };
    case "CLEAR_FILTERS":
      return { ...state, filters: { categoryId: null, searchQuery: "" } };
    default:
      return state;
  }
}

interface ProductsContextType {
  state: ProductsState;
  filteredProducts: Product[];
  fetchAllProducts: (params?: Record<string, string | number>) => Promise<void>;
  fetchSingleProduct: (id: number) => Promise<void>;
  fetchAllCategories: () => Promise<void>;
  setSearch: (q: string) => void;
  setCategory: (id: number | null) => void;
  clearFilters: () => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Use a ref to track categories fetch status to avoid stale closure / dep-loop
  const categoriesFetchedRef = useRef(false);

  const fetchAllProducts = useCallback(
    async (params?: Record<string, string | number>) => {
      dispatch({ type: "FETCH_PRODUCTS_START" });
      try {
        const data = await productsApi.getAll(params);
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: data });
      } catch (err: unknown) {
        dispatch({
          type: "FETCH_PRODUCTS_ERROR",
          payload: err instanceof Error ? err.message : "Failed to fetch products",
        });
      }
    },
    [] // stable — no deps needed
  );

  const fetchSingleProduct = useCallback(async (id: number) => {
    dispatch({ type: "FETCH_PRODUCT_START" });
    try {
      const data = await productsApi.getById(id);
      dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: data });
    } catch (err: unknown) {
      dispatch({
        type: "FETCH_PRODUCT_ERROR",
        payload: err instanceof Error ? err.message : "Failed to fetch product",
      });
    }
  }, []);

  const fetchAllCategories = useCallback(async () => {
    // Guard via ref instead of state to avoid re-render loop
    if (categoriesFetchedRef.current) return;
    categoriesFetchedRef.current = true;
    dispatch({ type: "FETCH_CATEGORIES_START" });
    try {
      const data = await categoriesApi.getAll();
      dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data });
    } catch {
      categoriesFetchedRef.current = false; // allow retry on error
      dispatch({ type: "FETCH_CATEGORIES_ERROR" });
    }
  }, []); // stable — ref prevents duplicate calls

  const setSearch = useCallback(
    (q: string) => dispatch({ type: "SET_SEARCH", payload: q }),
    []
  );
  const setCategory = useCallback(
    (id: number | null) => dispatch({ type: "SET_CATEGORY", payload: id }),
    []
  );
  const clearFilters = useCallback(
    () => dispatch({ type: "CLEAR_FILTERS" }),
    []
  );

  const filteredProducts = state.products.filter((p) => {
    const matchSearch =
      !state.filters.searchQuery ||
      p.title.toLowerCase().includes(state.filters.searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(state.filters.searchQuery.toLowerCase());
    const matchCategory =
      !state.filters.categoryId || p.category.id === state.filters.categoryId;
    return matchSearch && matchCategory;
  });

  return (
    <ProductsContext.Provider
      value={{
        state,
        filteredProducts,
        fetchAllProducts,
        fetchSingleProduct,
        fetchAllCategories,
        setSearch,
        setCategory,
        clearFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
