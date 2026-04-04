/** Khớp ProductVariantPayload phía admin / API */
export interface ProductVariant {
  name: string;
  value?: string;
  sku?: string;
  /** Gallery riêng từng biến thể */
  images?: string[];
  stock?: number;
  /** Một ảnh (legacy) — dùng khi chưa có mảng images */
  image?: string;
}

export interface Product {
  _id: string;
  sku?: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  images?: string[];
  coverImage?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  variants?: ProductVariant[];
  averageRating?: number;
}
