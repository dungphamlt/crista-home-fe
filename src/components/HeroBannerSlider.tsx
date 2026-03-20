"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export type HeroBannerItem = {
  image: string;
  title: string;
  link?: string;
};

const AUTO_MS = 5500;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

const transition = {
  type: "tween" as const,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function HeroBannerSlider({ banners }: { banners: HeroBannerItem[] }) {
  const list = banners.length > 0 ? banners : [];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (dir: number) => {
      if (list.length <= 1) return;
      setDirection(dir);
      setIndex((i) => (i + dir + list.length) % list.length);
    },
    [list.length],
  );

  useEffect(() => {
    if (list.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % list.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [list.length]);

  if (list.length === 0) return null;

  const current = list[index];

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              unoptimized={current.image.startsWith("http")}
            />
            {/* <div className="absolute inset-0 bg-black/30" /> */}
          </div>

          {/* <div className="container relative h-full flex flex-col justify-center z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg max-w-3xl">
                {current.title || "Đồ gia dụng gia đình hiện đại"}
              </h1>
              <p className="mt-4 text-xl text-white/90 max-w-xl">
                Tinh giản và bền bỉ — Thủy tinh, pha lê, gốm sứ cao cấp
              </p>
              {current.link ? (
                <Link
                  href={current.link}
                  className="mt-6 inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition w-fit"
                >
                  Xem thêm
                </Link>
              ) : (
                <Link
                  href="/san-pham"
                  className="mt-6 inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition w-fit"
                >
                  Xem sản phẩm
                </Link>
              )}
            </div>
          </div> */}
        </motion.div>
      </AnimatePresence>

      {list.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-sm transition"
            aria-label="Banner trước"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-sm transition"
            aria-label="Banner sau"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
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
        </>
      )}
    </section>
  );
}
