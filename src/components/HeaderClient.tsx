"use client";

import dynamic from "next/dynamic";

const HeaderNoSSR = dynamic(
  () => import("@/components/Header").then((m) => m.Header),
  {
    ssr: false,
    loading: () => (
      <div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800" />
    ),
  },
);

export function HeaderClient() {
  return <HeaderNoSSR />;
}

