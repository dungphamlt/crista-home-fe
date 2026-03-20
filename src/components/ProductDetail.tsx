"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import type { Product } from "@/types/product";

interface ProductDetailProps {
  product: {
    _id: string;
    sku?: string;
    name: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    price: number;
    compareAtPrice?: number;
    images?: string[];
    variants?: { name: string; value?: string; image?: string }[];
    category?: { _id: string };
    averageRating?: number;
    totalReviews?: number;
    uses?: string[];
    lifestyleImage?: string;
  };
  relatedProducts?: Product[];
}

const EMPTY_RELATED: Product[] = [];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + " VND";
}

function StarRating({
  rating = 5,
  size = "md",
}: {
  rating?: number;
  size?: "sm" | "md";
}) {
  const stars = Math.min(5, Math.max(0, Math.round(rating ?? 5)));
  const cls = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${cls} ${star <= stars ? "text-amber-gold" : "text-gray-200 dark:text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const SOCIAL_SHARE = [
  { href: "https://www.tiktok.com", label: "TikTok", color: "#000" },
  { href: "https://shopee.vn", label: "Shopee", color: "#EE4D2D" },
  {
    href: "https://www.facebook.com/CristaaHome",
    label: "Facebook",
    color: "#1877F2",
  },
  {
    href: "https://www.facebook.com/CristaaHome",
    label: "Facebook",
    color: "#1877F2",
  },
];

export function ProductDetail({
  product,
  relatedProducts = EMPTY_RELATED,
}: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [mainImage, setMainImage] = useState(
    product.images?.[0] ||
      product.variants?.[0]?.image ||
      PLACEHOLDER_IMAGES.product,
  );
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "comments">(
    "info",
  );
  const [comment, setComment] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  const images = product.images?.length
    ? product.images
    : [PLACEHOLDER_IMAGES.product];
  const variants = product.variants || [];

  const scrollCarousel = (dir: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
    }
  };

  return (
    <div className="container py-8">
      {/* Main section: Image + 3 info boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized={mainImage.startsWith("http")}
            />
            <button
              className="absolute bottom-3 left-3 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-lg flex items-center justify-center shadow-md hover:bg-white transition"
              aria-label="Phóng to"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            {images.slice(0, 4).map((img, i) => (
              <button
                key={`${img}-${i}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 shrink-0 relative rounded-lg overflow-hidden border-2 transition ${
                  mainImage === img
                    ? "border-gray-900 dark:border-white"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized={img.startsWith("http")}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: 3 white boxes */}
        <div className="space-y-4">
          {/* Box 1: Basic info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white uppercase leading-tight">
              {product.name}
            </h1>
            <div className="mt-2">
              <StarRating rating={product.averageRating} size="sm" />
            </div>
            {product.sku && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Mã sản phẩm: {product.sku}
              </p>
            )}
            <p className="mt-3 text-2xl font-bold text-red-600 dark:text-red-400">
              {formatPrice(product.price)}
            </p>

            {variants.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Màu sắc:
                  </span>
                  <span className="text-sm text-gray-500">
                    {selectedVariant?.name || variants[0]?.name}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {variants.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => {
                        setSelectedVariant(v);
                        if (v.image) setMainImage(v.image);
                      }}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${
                        selectedVariant?.name === v.name
                          ? "border-gray-900 dark:border-white"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      {v.image ? (
                        <Image
                          src={v.image}
                          alt={v.name}
                          width={40}
                          height={40}
                          className="object-cover"
                          unoptimized={v.image?.startsWith("http")}
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-gray-200 dark:bg-gray-600"
                          title={v.name}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <a
              href="https://www.facebook.com/CristaaHome"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-red-600 dark:text-red-400 font-medium hover:underline"
            >
              Liên hệ Fanpage để đặt hàng
            </a>
          </div>

          {/* Box 2: Mô tả */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
              Mô tả
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">
              {product.shortDescription || "Đang cập nhật..."}
            </p>
          </div>

          {/* Box 3: Social share */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex gap-3">
              {SOCIAL_SHARE.map((s, i) => (
                <a
                  key={`${s.label}-${i}`}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: s.color }}
                  aria-label={s.label}
                >
                  {s.label === "TikTok" ? (
                    <TikTokIcon />
                  ) : s.label === "Shopee" ? (
                    <ShopeeIcon />
                  ) : (
                    <FacebookIcon />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Sidebar section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700">
            {(["info", "reviews", "comments"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold border-b-2 transition cursor-pointer ${
                  activeTab === tab
                    ? "border-amber-gold text-amber-gold"
                    : "border-transparent hover:text-amber-gold dark:hover:text-white"
                }`}
              >
                {tab === "info" && "Thông tin sản phẩm"}
                {tab === "reviews" && "Đánh giá"}
                {tab === "comments" && "Bình luận"}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {activeTab === "info" && (
              <div
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
              />
            )}
            {activeTab === "reviews" && (
              <p className="text-gray-600 dark:text-gray-400">
                Nội dung đánh giá sẽ hiển thị tại đây.
              </p>
            )}
            {activeTab === "comments" && (
              <p className="text-gray-600 dark:text-gray-400">
                Nội dung bình luận sẽ hiển thị tại đây.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar: Bạn có thể thích */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 dark:text-white uppercase text-sm mb-4">
            Bạn có thể thích
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
            {relatedProducts.slice(0, 3).map((p) => (
              <Link
                key={p._id}
                href={`/san-pham/${p.slug}`}
                className="flex gap-3 group cursor-pointer border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={p.images?.[0] || PLACEHOLDER_IMAGES.product}
                    alt={p.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full group-hover:scale-105 transition"
                    unoptimized={(p.images?.[0] || "").startsWith("http")}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-amber-gold transition">
                    {p.name}
                  </h4>
                  <p className="text-red-600 dark:text-red-400 font-semibold text-sm mt-1">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            ))}
            {relatedProducts.length === 0 && (
              <p className="text-gray-500 text-sm">Chưa có sản phẩm gợi ý.</p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews card */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          Khách hàng đánh giá
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-amber-gold">
              {product.averageRating?.toFixed(1) || "5.0"}
            </span>
            <StarRating rating={product.averageRating} />
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-8">{star} sao</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-gold rounded-full"
                    style={{ width: "0%" }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-10">0%</span>
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Chia sẻ nhận xét về sản phẩm
            </p>
            <button className="px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:opacity-90 transition">
              Đánh giá và nhận xét
            </button>
          </div>
        </div>
      </div>

      {/* Comments card */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          Bình luận
        </h3>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Mời bạn để lại bình luận"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-gold/50 pr-12"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Đính kèm ảnh"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
              </svg>
            </button>
          </div>
          <button className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:opacity-90 transition shrink-0">
            Gửi bình luận
          </button>
        </div>
      </div>

      {/* Related products carousel */}
      <div className="mt-12">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6">
          Sản phẩm liên quan
        </h3>
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          >
            {relatedProducts.map((p) => (
              <Link
                key={p._id}
                href={`/san-pham/${p.slug}`}
                className="shrink-0 w-64 group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="aspect-square relative bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={p.images?.[0] || PLACEHOLDER_IMAGES.product}
                      alt={p.name}
                      width={256}
                      height={256}
                      className="object-cover w-full h-full group-hover:scale-105 transition"
                      unoptimized={(p.images?.[0] || "").startsWith("http")}
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                      aria-label="Yêu thích"
                      onClick={(e) => e.preventDefault()}
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-amber-gold transition">
                      {p.name}
                    </h4>
                    <p className="text-red-600 dark:text-red-400 font-semibold mt-2">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {relatedProducts.length > 3 && (
            <button
              onClick={() => scrollCarousel(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

function ShopeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.2 3.4H6.8L3 8.2v12.6h18V8.2l-3.8-4.8zM12 18c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
