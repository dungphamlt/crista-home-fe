import { api, endpoints } from "@/lib/api";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  TruckIcon,
  RefreshIcon,
  ThumbsUpIcon,
  LightningIcon,
} from "@/components/ServiceIcons";
import Link from "next/link";
import Image from "next/image";
import { HeroBannerSlider } from "@/components/HeroBannerSlider";
import {
  LatestNewsCarousel,
  type LatestNewsItem,
} from "@/components/LatestNewsCarousel";
import {
  CATEGORY_PARENT_CRISTA,
  CATEGORY_PARENT_TEWA,
} from "@/lib/category-brands";

function normalizeLatestBlogs(raw: unknown): LatestNewsItem[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as LatestNewsItem[];
  const r = raw as { data?: unknown };
  if (Array.isArray(r.data)) return r.data as LatestNewsItem[];
  return [];
}

async function getHomeData(): Promise<{
  categoriesCrista: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    productCount?: number;
    order?: number;
  }[];
  categoriesTewa: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    productCount?: number;
    order?: number;
  }[];
  featured: Product[];
  newProducts: Product[];
  banners: { image: string; title: string; link?: string }[];
  latestBlogs: LatestNewsItem[];
}> {
  try {
    const [
      categoriesCrista,
      categoriesTewa,
      featuredRes,
      newRes,
      bannersRes,
      latestBlogsRes,
    ] = await Promise.all([
      api.get(
        endpoints.categories({
          parentId: CATEGORY_PARENT_CRISTA,
          withCount: true,
        }),
      ),
      api.get(
        endpoints.categories({
          parentId: CATEGORY_PARENT_TEWA,
          withCount: true,
        }),
      ),
      api.get(endpoints.featuredProducts(12)),
      api.get(endpoints.newProducts(12)),
      api.get(endpoints.banners()),
      api.get(endpoints.latestBlogs(4)).catch(() => ({ data: null })),
    ]);
    let latestBlogs = normalizeLatestBlogs(latestBlogsRes.data);
    if (latestBlogs.length === 0) {
      try {
        const blogPage = await api.get(endpoints.blogs(1));
        const body = blogPage.data as { data?: LatestNewsItem[] };
        latestBlogs = (body?.data || []).slice(0, 4);
      } catch {
        latestBlogs = [];
      }
    }
    return {
      categoriesCrista:
        (categoriesCrista.data as {
          _id: string;
          name: string;
          slug: string;
          image?: string;
          productCount?: number;
          order?: number;
        }[]) || [],
      categoriesTewa:
        (categoriesTewa.data as {
          _id: string;
          name: string;
          slug: string;
          image?: string;
          productCount?: number;
          order?: number;
        }[]) || [],
      featured: (featuredRes.data as Product[]) || [],
      newProducts: (newRes.data as Product[]) || [],
      banners: normalizeBanners(bannersRes.data),
      latestBlogs,
    };
  } catch {
    return {
      categoriesCrista: [] as {
        _id: string;
        name: string;
        slug: string;
        image?: string;
        productCount?: number;
        order?: number;
      }[],
      categoriesTewa: [] as {
        _id: string;
        name: string;
        slug: string;
        image?: string;
        productCount?: number;
        order?: number;
      }[],
      featured: [] as Product[],
      newProducts: [] as Product[],
      banners: [] as { image: string; title: string; link?: string }[],
      latestBlogs: [] as LatestNewsItem[],
    };
  }
}

function normalizeBanners(raw: unknown): {
  image: string;
  title: string;
  link?: string;
}[] {
  if (!raw) return [];
  const arr = Array.isArray(raw)
    ? raw
    : (raw as { data?: unknown }).data;
  if (!Array.isArray(arr)) return [];
  return arr
    .map((item: unknown) => {
      const b = item as Record<string, unknown>;
      const image =
        (typeof b.image === "string" && b.image) ||
        (typeof b.imageUrl === "string" && b.imageUrl) ||
        (typeof b.url === "string" && b.url) ||
        "";
      const title =
        (typeof b.title === "string" && b.title) ||
        (typeof b.name === "string" && b.name) ||
        "Banner";
      const link =
        typeof b.link === "string"
          ? b.link
          : typeof b.href === "string"
            ? b.href
            : undefined;
      return image ? { image, title, link } : null;
    })
    .filter(Boolean) as { image: string; title: string; link?: string }[];
}

export default async function HomePage() {
  const {
    categoriesCrista,
    categoriesTewa,
    featured,
    newProducts,
    banners,
    latestBlogs,
  } = await getHomeData();
  const bannerList =
    banners.length > 0
      ? banners
      : [
          {
            image: PLACEHOLDER_IMAGES.banner,
            title: "Đồ gia dụng gia đình hiện đại",
            link: "/san-pham",
          },
        ];

  return (
    <div>
      <HeroBannerSlider banners={bannerList} />

      {/* Service Bar */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: TruckIcon,
                title: "Giao hỏa tốc",
                desc: "Nội thành TP. HCM trong 4h",
              },
              {
                icon: RefreshIcon,
                title: "Đổi trả miễn phí",
                desc: "Trong vòng 30 ngày miễn phí",
              },
              {
                icon: ThumbsUpIcon,
                title: "Hỗ trợ 24/7",
                desc: "Hỗ trợ khách hàng 24/7",
              },
              {
                icon: LightningIcon,
                title: "Deal hot bùng nổ",
                desc: "Flash sale giảm giá cực sốc",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <item.icon />
                  <h3 className="font-bold mt-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CRISTA Categories */}
      {categoriesCrista.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 uppercase tracking-tight text-gray-900 dark:text-white">
                CRISTA – THỦY TINH • PHA LÊ • GỐM • SỨ CAO CẤP
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categoriesCrista.slice(0, 6).map(
                (
                  cat: {
                    _id: string;
                    name: string;
                    slug: string;
                    image?: string;
                    productCount?: number;
                    order?: number;
                  },
                  i: number,
                ) => (
                  <ScrollReveal key={cat._id} delay={i * 0.05}>
                    <Link
                      href={`/danh-muc/${cat.slug}`}
                      className="block text-center group"
                    >
                      <div className="aspect-square shadow-sm relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
                        <Image
                          src={cat.image || PLACEHOLDER_IMAGES.category}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                          sizes="(max-width: 768px) 50vw, 16vw"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-rose-500">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {cat.order ? `#${cat.order}` : (cat.productCount ?? 0)}{" "}
                        Sản phẩm
                      </p>
                    </Link>
                  </ScrollReveal>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sản phẩm nổi bật */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                SẢN PHẨM BÁN CHẠY
              </h2>
              <Link
                href="/san-pham?featured=true"
                className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition"
              >
                Xem tất cả
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {(featured.length > 0 ? featured : newProducts).map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TEWA Categories */}
      {categoriesTewa.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 uppercase tracking-tight text-gray-900 dark:text-white">
                TEWA – ĐỒ GIA DỤNG
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categoriesTewa.slice(0, 6).map((cat, i) => (
                <ScrollReveal key={cat._id} delay={i * 0.05}>
                  <Link
                    href={`/danh-muc/${cat.slug}`}
                    className="block text-center group"
                  >
                    <div className="aspect-square shadow-sm relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
                      <Image
                        src={cat.image || PLACEHOLDER_IMAGES.category}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        sizes="(max-width: 768px) 50vw, 16vw"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-rose-500">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {cat.order ? `#${cat.order}` : (cat.productCount ?? 0)}{" "}
                      Sản phẩm
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sản phẩm mới */}
      <section className="pt-16 pb-10 md:pb-28 bg-white dark:bg-gray-900">
        <div className="container">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                SẢN PHẨM MỚI
              </h2>
              <Link
                href="/san-pham?new=true"
                className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition"
              >
                Xem tất cả
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {latestBlogs.length > 0 && (
        <LatestNewsCarousel posts={latestBlogs} />
      )}
    </div>
  );
}
