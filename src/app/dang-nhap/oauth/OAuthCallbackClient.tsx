"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { AuthUser } from "@/types/auth";

function parseUserFromParams(searchParams: URLSearchParams): AuthUser | null {
  const raw = searchParams.get("user");
  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      return JSON.parse(decoded) as AuthUser;
    } catch {
      try {
        return JSON.parse(atob(raw)) as AuthUser;
      } catch {
        return null;
      }
    }
  }
  const email =
    searchParams.get("email") || searchParams.get("sub") || "";
  const id = searchParams.get("id") || email || "oauth";
  const name = searchParams.get("name") || undefined;
  const role = searchParams.get("role") || "user";
  if (!email && !searchParams.get("access_token")) return null;
  return {
    id: String(id),
    email,
    name,
    role,
  };
}

export function OAuthCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token =
      searchParams.get("access_token") || searchParams.get("token");
    if (!token) {
      setError(
        "Thiếu access_token trong URL. Sau OAuth (Google/Facebook), backend redirect về: " +
          `${typeof window !== "undefined" ? window.location.origin : ""}/dang-nhap/oauth?access_token=...&email=...&name=...`,
      );
      return;
    }

    const user = parseUserFromParams(searchParams);
    if (!user || !user.email) {
      setError(
        "Thiếu thông tin user. Thêm query email, name hoặc user (JSON) khi redirect từ backend.",
      );
      return;
    }

    setSession(token, user);
    router.replace("/");
  }, [searchParams, router, setSession]);

  if (error) {
    return (
      <div className="container max-w-lg mx-auto py-16 md:py-24 px-4">
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-6 text-sm text-red-800 dark:text-red-200">
          <p className="font-semibold mb-2">Không hoàn tất đăng nhập</p>
          <p className="leading-relaxed mb-6">{error}</p>
          <Link
            href="/?auth=login"
            className="text-amber-700 dark:text-amber-400 font-medium hover:underline"
          >
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20 text-center text-gray-600 dark:text-gray-400">
      <p className="text-sm">Đang hoàn tất đăng nhập…</p>
    </div>
  );
}
