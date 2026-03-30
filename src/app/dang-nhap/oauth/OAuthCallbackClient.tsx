"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { AuthUser } from "@/types/auth";

/** Gộp query Next.js với hash (#access_token=...) nếu backend redirect dùng fragment. */
function mergeUrlOAuthParams(searchParams: {
  toString: () => string;
}): URLSearchParams {
  const merged = new URLSearchParams(searchParams.toString());
  if (typeof window !== "undefined") {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const hp = new URLSearchParams(hash);
      hp.forEach((v, k) => {
        if (!merged.has(k)) merged.set(k, v);
      });
    }
  }
  return merged;
}

/** Một query chứa toàn bộ JSON `{ access_token, user }` (encodeURIComponent hoặc base64). */
function tryEmbeddedOAuthResponse(
  sp: URLSearchParams,
): { access_token: string; user: AuthUser } | null {
  const keys = ["oauth", "payload", "auth", "data"];
  for (const key of keys) {
    const raw = sp.get(key);
    if (!raw) continue;

    const tryParse = (
      text: string,
    ): { access_token: string; user: AuthUser } | null => {
      try {
        const body = JSON.parse(text) as {
          access_token?: unknown;
          user?: unknown;
        };
        if (
          typeof body.access_token === "string" &&
          body.user &&
          typeof body.user === "object" &&
          body.user !== null &&
          typeof (body.user as AuthUser).email === "string"
        ) {
          return {
            access_token: body.access_token,
            user: body.user as AuthUser,
          };
        }
      } catch {
        /* next */
      }
      return null;
    };

    let decoded = raw;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      /* keep raw */
    }

    const fromDecoded = tryParse(decoded);
    if (fromDecoded) return fromDecoded;
    const fromRaw = tryParse(raw);
    if (fromRaw) return fromRaw;

    try {
      let b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
      const pad = (4 - (b64.length % 4)) % 4;
      if (pad) b64 += "=".repeat(pad);
      const fromB64 = tryParse(atob(b64));
      if (fromB64) return fromB64;
    } catch {
      continue;
    }
  }
  return null;
}

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

  console.log(searchParams, "searchParams");

  // ✅ Fix: guard chặt hơn — không fallback id về "oauth"
  const email = searchParams.get("email") || searchParams.get("sub") || "";
  const id = searchParams.get("id");
  const name = searchParams.get("name") || undefined;
  const avatar = searchParams.get("avatar") || undefined;

  if (!id || !email) return null;

  return { id, email, name, avatar };
}

export function OAuthCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // ✅ Fix: chỉ xử lý 1 lần khi mount, tránh chạy lại khi searchParams thay đổi
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    void (async () => {
      try {
        const merged = mergeUrlOAuthParams(searchParams);

        const oauthErr = merged.get("error") || merged.get("error_description");
        if (oauthErr) {
          setError(
            typeof oauthErr === "string"
              ? decodeURIComponent(oauthErr)
              : "OAuth thất bại.",
          );
          return;
        }

        const embedded = tryEmbeddedOAuthResponse(merged);
        if (embedded) {
          await setSession(embedded.access_token, embedded.user);
          router.replace("/");
          return;
        }

        const token = merged.get("access_token") || merged.get("token");
        if (!token) {
          setError(
            "Thiếu access_token trong URL. Sau khi Google redirect về backend, backend cần redirect về: " +
              `${typeof window !== "undefined" ? window.location.origin : ""}/dang-nhap/oauth?access_token=...&user=... (JSON) hoặc &email=...&id=...&name=...`,
          );
          return;
        }

        const user = parseUserFromParams(merged);
        if (!user || !user.email) {
          setError(
            "Thiếu thông tin user. Thêm query user (JSON encode), hoặc id + email + name khi redirect từ backend.",
          );
          return;
        }

        await setSession(token, user);
        router.replace("/");
      } catch (e) {
        handled.current = false;
        setError(
          e instanceof Error ? e.message : "Không lưu được phiên đăng nhập.",
        );
      }
    })();
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

  // ✅ Fix: loading UI đẹp hơn
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700" />
        <div className="absolute inset-0 rounded-full border-2 border-t-amber-500 animate-spin" />
      </div>
      <p className="text-sm">Đang hoàn tất đăng nhập…</p>
    </div>
  );
}
