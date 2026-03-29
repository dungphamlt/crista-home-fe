"use client";

import { useEffect, useState } from "react";

/** `true` chỉ sau khi client đã mount — tránh lệch SSR/client với localStorage, searchParams, v.v. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
