export interface Product {
  _id: string;
  sku?: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  images?: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  variants?: { name: string }[];
  averageRating?: number;
}
