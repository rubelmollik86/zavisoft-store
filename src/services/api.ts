import axios from "axios";
import { Product, Category } from "@/types";

const BASE_URL = "https://api.escuelajs.co/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg = err.response?.data?.message || err.message || "Unknown error";
    return Promise.reject(new Error(msg));
  }
);

export const productsApi = {
  getAll: async (params?: Record<string, string | number>): Promise<Product[]> => {
    const { data } = await apiClient.get("/products", { params });
    return data;
  },
  getById: async (id: number): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },
  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const { data } = await apiClient.get(`/products/?categoryId=${categoryId}`);
    return data;
  },
};

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get("/categories");
    return data;
  },
};

export default apiClient;
