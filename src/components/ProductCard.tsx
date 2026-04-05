"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { useScrollRevealOnce } from "@/hooks/useScrollRevealOnce";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + " VND";
}

function StarRating({ rating = 5 }: { rating?: number }) {
  const stars = Math.min(5, Math.max(0, Math.round(rating || 5)));
  return (
    <div className="flex gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= stars ? "text-yellow-400" : "text-gray-200 dark:text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState(false);
  const { ref: revealRef, visible: revealVisible } =
    useScrollRevealOnce("-50px", 0.08);
  const img =
    product.coverImage || product.images?.[0] || PLACEHOLDER_IMAGES.product;
  const variantLabel = product.variants?.[0]?.name;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product._id,
      productName: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: img,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist(!wishlist);
  };

  return (
    <div
      ref={revealRef}
      className={`transition-all duration-400 ease-out ${
        revealVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5"
      }`}
      style={{
        transitionDelay: revealVisible ? `${index * 0.05}s` : undefined,
      }}
    >
      <Link href={`/san-pham/${product.slug}`} className="block group">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={img}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              unoptimized={img.startsWith("http")}
            />
            {/* Tags */}
            <div className="absolute top-2 left-2 flex gap-1">
              {product.isFeatured && (
                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-400 text-red-600 rounded">
                  Nổi Bật
                </span>
              )}
              {product.isNewArrival && (
                <span className="px-2 py-0.5 text-xs bg-green-500 text-white rounded">
                  Mới
                </span>
              )}
            </div>
            {/* Variant/Color tag - bottom left */}
            {/* {variantLabel && (
              <span className="absolute bottom-2 left-2 px-2 py-0.5 text-xs font-medium text-gray-800 bg-white/80 dark:bg-gray-900/80 dark:text-white rounded">
                {variantLabel}
              </span>
            )} */}
            {/* Wishlist - top right */}
            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-sm"
              aria-label="Yêu thích"
            >
              <svg
                className={`w-4 h-4 ${wishlist ? "text-red-500 fill-red-500" : "text-gray-600 dark:text-gray-400"}`}
                fill={wishlist ? "currentColor" : "none"}
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
            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-rose-500 transition-colors">
              {product.name}
            </h3>
            <p className="text-red-600 dark:text-red-400 font-semibold mt-2">
              {formatPrice(product.price)}
            </p>
            <StarRating rating={product.averageRating} />
            <button
              onClick={handleAddToCart}
              className="mt-3 w-full py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg transition"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
