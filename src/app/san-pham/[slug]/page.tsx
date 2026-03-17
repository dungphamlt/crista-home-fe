import { api, endpoints } from '@/lib/api';
import { PLACEHOLDER_IMAGES } from '@/lib/constants';
import { ProductDetail } from '@/components/ProductDetail';
import { notFound } from 'next/navigation';

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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const res = await api.get(endpoints.productBySlug(slug));
    const product = res.data;
    if (!product) notFound();
    return <ProductDetail product={product} />;
  } catch {
    notFound();
  }
}
