import { api, endpoints } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const res = await api.get(endpoints.categoryBySlug(slug));
    const cat = res.data;
    return {
      title: `${cat?.name || "Danh mục"} - Crista Home`,
      description: cat?.description || `Sản phẩm ${cat?.name}`,
    };
  } catch {
    return { title: "Danh mục - Crista Home" };
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;

  let category: { _id: string; name: string } | null = null;
  let products: {
    data: {
      _id: string;
      name: string;
      slug: string;
      price: number;
      compareAtPrice?: number;
      images?: string[];
      isFeatured?: boolean;
      isNewArrival?: boolean;
    }[];
    totalPages: number;
  } = { data: [], totalPages: 1 };

  try {
    const catRes = await api.get(endpoints.categoryBySlug(slug));
    category = catRes.data;
    if (category) {
      const prodRes = await api.get(
        endpoints.products({
          category: category._id,
          page: parseInt(page, 10),
          limit: 12,
        }),
      );
      products = prodRes.data;
    }
  } catch {
    notFound();
  }

  if (!category) notFound();

  return (
    <div className="container py-8 mb-6 lg:mb-16">
      <NavLinks
        className="dark:text-gray-400"
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham", variant: "emphasis" },
          { label: category.name },
        ]}
      />
      <h1 className="text-2xl font-bold mb-8">{category.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.data.map((p, i) => (
          <ProductCard key={p._id} product={p} index={i} />
        ))}
      </div>
      {products.data.length === 0 && (
        <p className="text-center py-12 text-gray-500">
          Chưa có sản phẩm trong danh mục này.
        </p>
      )}
      {products.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: products.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <Link
                key={p}
                href={`/danh-muc/${slug}?page=${p}`}
                className={`px-4 py-2 rounded ${
                  p === parseInt(page, 10)
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                }`}
              >
                {p}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}
