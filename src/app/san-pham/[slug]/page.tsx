import { api, endpoints } from '@/lib/api';
import { ProductDetail } from '@/components/ProductDetail';
import { notFound } from 'next/navigation';
import type { Product } from '@/types/product';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const res = await api.get(endpoints.productBySlug(slug));
    const product = res.data;
    return {
      title: `${product?.name || 'Sản phẩm'} - Crista Home`,
      description: product?.shortDescription || product?.description?.slice(0, 160),
    };
  } catch {
    return { title: 'Sản phẩm - Crista Home' };
  }
}

async function getRelatedProducts(productId: string, categoryId?: string): Promise<Product[]> {
  try {
    const params: Record<string, string | number> = { limit: 8 };
    if (categoryId) params.category = categoryId;
    const res = await api.get(endpoints.products(params));
    const data = (res.data?.data || res.data) as Product[];
    return Array.isArray(data) ? data.filter((p) => p._id !== productId) : [];
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const res = await api.get(endpoints.productBySlug(slug));
    const product = res.data;
    if (!product) notFound();

    const categoryId = product.category?._id || product.categoryId;
    const relatedProducts = await getRelatedProducts(product._id, categoryId);

    return <ProductDetail product={product} relatedProducts={relatedProducts} />;
  } catch {
    notFound();
  }
}
