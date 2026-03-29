"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useMounted } from "@/hooks/useMounted";

/** Mở modal khi URL có `?auth=login` hoặc `?auth=register` (deep link / bookmark). */
export function AuthSearchParamsSync() {
  const mounted = useMounted();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { openAuthModal } = useAuth();

  useEffect(() => {
    if (!mounted) return;
    const auth = searchParams.get("auth");
    if (auth !== "login" && auth !== "register") return;

    openAuthModal(auth === "register" ? "register" : "login");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    const q = params.toString();
    const next = q ? `${pathname}?${q}` : pathname;
    router.replace(next, { scroll: false });
  }, [mounted, searchParams, pathname, router, openAuthModal]);

  return null;
}
