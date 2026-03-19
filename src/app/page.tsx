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

async function getHomeData(): Promise<{
  categories: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    productCount?: number;
  }[];
  featured: Product[];
  newProducts: Product[];
  banners: { image: string; title: string; link?: string }[];
}> {
  try {
    const [categoriesRes, featuredRes, newRes, bannersRes] = await Promise.all([
      api.get(endpoints.categories(true)),
      api.get(endpoints.featuredProducts(12)),
      api.get(endpoints.newProducts(12)),
      api.get(endpoints.banners()),
    ]);
    return {
      categories:
        (categoriesRes.data as {
          _id: string;
          name: string;
          slug: string;
          image?: string;
          productCount?: number;
        }[]) || [],
      featured: (featuredRes.data as Product[]) || [],
      newProducts: (newRes.data as Product[]) || [],
      banners:
        (bannersRes.data as {
          image: string;
          title: string;
          link?: string;
        }[]) || [],
    };
  } catch (error) {
    console.log("error", error);
    return {
      categories: [] as {
        _id: string;
        name: string;
        slug: string;
        image?: string;
        productCount?: number;
      }[],
      featured: [] as Product[],
      newProducts: [] as Product[],
      banners: [] as { image: string; title: string; link?: string }[],
    };
  }
}

export default async function HomePage() {
  const { categories, featured, newProducts, banners } = await getHomeData();
  console.log("categories", categories);
  console.log("featured", featured);
  console.log("newProducts", newProducts);
  console.log("banners", banners);

  const bannerList =
    Array.isArray(banners) && banners.length > 0
      ? banners
      : [{ image: PLACEHOLDER_IMAGES.banner, title: "Crista Home", link: "/" }];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={bannerList[0].image}
            alt={bannerList[0].title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Đồ gia dụng gia đình hiện đại
          </h1>
          <p className="mt-4 text-xl text-white/90 max-w-xl">
            Tinh giản và bền bỉ — Thủy tinh, pha lê, gốm sứ cao cấp
          </p>
          <Link
            href="/san-pham"
            className="mt-6 inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition w-fit"
          >
            Xem sản phẩm
          </Link>
        </div>
      </section>

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
      {categories.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 uppercase tracking-tight text-gray-900 dark:text-white">
                CRISTA – THỦY TINH • PHA LÊ • GỐM • SỨ CAO CẤP
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {categories.slice(0, 6).map(
                (
                  cat: {
                    _id: string;
                    name: string;
                    slug: string;
                    image?: string;
                    productCount?: number;
                  },
                  i: number,
                ) => (
                  <ScrollReveal key={cat._id} delay={i * 0.05}>
                    <Link
                      href={`/danh-muc/${cat.slug}`}
                      className="block text-center group"
                    >
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
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
                        {cat.productCount ?? 0} Sản phẩm
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

      {/* Sản phẩm mới */}
      <section className="py-16 bg-white dark:bg-gray-900">
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
    </div>
  );
}
