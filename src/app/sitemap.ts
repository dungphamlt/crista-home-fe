import { MetadataRoute } from 'next';
import { api, endpoints } from '@/lib/api';
import { SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${SITE_URL}/san-pham`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/tin-tuc`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/lien-he-lam-nha-phan-phoi`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${SITE_URL}/gio-hang`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/don-hang`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  let productUrls: MetadataRoute.Sitemap = [];
  let categoryUrls: MetadataRoute.Sitemap = [];
  let blogUrls: MetadataRoute.Sitemap = [];

  try {
    const [categoriesRes, productsRes, blogsRes] = await Promise.all([
      api.get(endpoints.categories()),
      api.get(endpoints.products({ limit: 1000 })),
      api.get(endpoints.blogs(1)),
    ]);

    const categories = (categoriesRes.data || []) as { slug: string }[];
    const products = (productsRes.data as { data?: unknown[] })?.data || [];
    const blogs = (blogsRes.data as { data?: { slug: string }[] })?.data || [];

    categoryUrls = categories.map((c) => ({
      url: `${SITE_URL}/danh-muc/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    productUrls = (products as { slug: string }[]).map((p) => ({
      url: `${SITE_URL}/san-pham/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    blogUrls = blogs.map((b) => ({
      url: `${SITE_URL}/tin-tuc/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {
    // Fallback - API might not be available at build time
  }

  return [...base, ...categoryUrls, ...productUrls, ...blogUrls];
}
