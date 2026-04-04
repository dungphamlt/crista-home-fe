import axios from "axios";
import { getAuthTokenForApi } from "@/lib/auth-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAuthTokenForApi();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export function getApiBaseUrl(): string {
  return API_URL;
}

/** Dùng với `fetch` (Server Components) — axios không hỗ trợ `next.revalidate`. */
export async function fetchApiCached<T>(path: string): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const endpoints = {
  authLogin: () => "/auth/login",
  authRegister: () => "/auth/register",
  /** GET — bắt đầu OAuth (redirect trình duyệt tới Google) */
  authGoogle: () => "/auth/google",
  /** GET — bắt đầu OAuth (redirect trình duyệt tới Facebook) */
  authFacebook: () => "/auth/facebook",
  categories: (options?: { parentId?: string; withCount?: boolean }) => {
    const params = new URLSearchParams();
    if (options?.parentId) params.set("parent", options.parentId);
    if (options?.withCount) params.set("withCount", "true");
    const qs = params.toString();
    return `/categories${qs ? `?${qs}` : ""}`;
  },
  categoryBySlug: (slug: string) => `/categories/slug/${slug}`,
  products: (params?: Record<string, string | number>) => {
    if (!params || Object.keys(params).length === 0) return "/products";
    const search = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)]),
      ),
    ).toString();
    return `/products?${search}`;
  },
  productBySlug: (slug: string) => `/products/slug/${slug}`,
  productById: (id: string) => `/products/${id}`,
  featuredProducts: (limit?: number) =>
    `/products/featured${limit ? `?limit=${limit}` : ""}`,
  newProducts: (limit?: number) =>
    `/products/new${limit ? `?limit=${limit}` : ""}`,
  orders: () => "/orders",
  orderByCode: (code: string) => `/orders/code/${code}`,
  validateCoupon: (code: string, amount: number) =>
    `/coupons/validate?code=${code}&amount=${amount}`,
  reviews: (productId: string, page?: number) =>
    `/reviews/product/${productId}${page ? `?page=${page}` : ""}`,
  createReview: () => "/reviews",
  blogs: (page?: number) => `/blogs${page ? `?page=${page}` : ""}`,
  blogBySlug: (slug: string) => `/blogs/slug/${slug}`,
  latestBlogs: (limit?: number) =>
    `/blogs/latest${limit ? `?limit=${limit}` : ""}`,
  banners: () => "/banners",
  pages: (params?: { page?: number; limit?: number }) => {
    const p = params || {};
    const search = new URLSearchParams(
      Object.entries(p)
        .filter(([, v]) => v != null)
        .map(([k, v]) => [k, String(v)]),
    ).toString();
    return `/pages${search ? `?${search}` : ""}`;
  },
  pageBySlug: (slug: string) => `/pages/slug/${slug}`,
  page: (id: string) => `/pages/${id}`,
};
