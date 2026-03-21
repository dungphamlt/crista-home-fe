"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";

export type LatestNewsItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
};

function formatBlogDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function ChevronLeft() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function LatestNewsCarousel({ posts }: { posts: LatestNewsItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateArrows);
    };
  }, [posts, updateArrows]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-news-card]");
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-14 md:py-16 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200/80 dark:border-gray-800">
      <div className="container">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10 md:mb-12 tracking-tight">
          Tin tức mới nhất
        </h2>

        <div className="relative">
          <button
            type="button"
            aria-label="Tin trước"
            disabled={!canPrev}
            onClick={() => scrollByDir(-1)}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1 md:-translate-x-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-30 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Tin sau"
            disabled={!canNext}
            onClick={() => scrollByDir(1)}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1 md:translate-x-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-30 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-2 pl-12 pr-12 md:pl-14 md:pr-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {posts.map((post) => (
              <article
                key={post._id}
                data-news-card
                className="news-card flex-[0_0_min(100%,320px)] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)] snap-start shrink-0 min-w-0 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <Link href={`/tin-tuc/${post.slug}`} className="group flex h-full flex-col">
                  <div className="relative aspect-4/3 bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={post.thumbnail || PLACEHOLDER_IMAGES.blog}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition duration-300"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1 min-h-0">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {post.title}
                    </h3>
                    <time
                      dateTime={post.createdAt || post.updatedAt}
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      {formatBlogDate(post.createdAt || post.updatedAt) ||
                        "—"}
                    </time>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
    </section>
  );
}
