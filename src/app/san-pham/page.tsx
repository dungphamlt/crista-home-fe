import { api, endpoints } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';

interface SearchParams {
  page?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  featured?: string;
  new?: string;
}

export const metadata = {
  title: 'Sản phẩm - Crista Home',
  description: 'Khám phá đồ gia dụng cao cấp - thủy tinh, pha lê, gốm sứ',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const filters: Record<string, string | number> = { page, limit: 12 };
  if (params.category) filters.category = params.category;
  if (params.minPrice) filters.minPrice = params.minPrice;
  if (params.maxPrice) filters.maxPrice = params.maxPrice;
  if (params.search) filters.search = params.search;
  if (params.featured === 'true') filters.featured = 'true';
  if (params.new === 'true') filters.new = 'true';

  let data: { data: import('@/types/product').Product[]; totalPages: number; total: number } = {
    data: [],
    totalPages: 1,
    total: 0,
  };
  try {
    const res = await api.get(endpoints.products(filters));
    data = res.data;
  } catch {
    // fallback
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Sản phẩm</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <ProductFilters searchParams={params as Record<string, string | undefined>} />
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.data.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
          {data.data.length === 0 && (
            <p className="text-center py-12 text-gray-500">Chưa có sản phẩm nào.</p>
          )}
          {data.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/san-pham?page=${p}${params.category ? `&category=${params.category}` : ''}${params.search ? `&search=${params.search}` : ''}`}
                  className={`px-4 py-2 rounded ${
                    p === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
