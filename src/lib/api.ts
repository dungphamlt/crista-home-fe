import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const endpoints = {
  categories: (withCount?: boolean) =>
    `/categories${withCount ? '?withCount=true' : ''}`,
  categoryBySlug: (slug: string) => `/categories/slug/${slug}`,
  products: (params?: Record<string, string | number>) => {
    if (!params || Object.keys(params).length === 0) return '/products';
    const search = new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    ).toString();
    return `/products?${search}`;
  },
  productBySlug: (slug: string) => `/products/slug/${slug}`,
  productById: (id: string) => `/products/${id}`,
  featuredProducts: (limit?: number) => `/products/featured${limit ? `?limit=${limit}` : ''}`,
  newProducts: (limit?: number) => `/products/new${limit ? `?limit=${limit}` : ''}`,
  orders: () => '/orders',
  orderByCode: (code: string) => `/orders/code/${code}`,
  validateCoupon: (code: string, amount: number) => `/coupons/validate?code=${code}&amount=${amount}`,
  reviews: (productId: string, page?: number) =>
    `/reviews/product/${productId}${page ? `?page=${page}` : ''}`,
  createReview: () => '/reviews',
  blogs: (page?: number) => `/blogs${page ? `?page=${page}` : ''}`,
  blogBySlug: (slug: string) => `/blogs/slug/${slug}`,
  latestBlogs: (limit?: number) => `/blogs/latest${limit ? `?limit=${limit}` : ''}`,
  banners: () => '/banners',
};
