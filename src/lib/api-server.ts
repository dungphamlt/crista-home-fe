import { cookies } from "next/headers";
import { AUTH_TOKEN_COOKIE } from "./auth-cookie-names";
import { getApiBaseUrl } from "./api";

/** Lấy Authorization header khi chạy trên server (Server Components) */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  if (typeof window !== "undefined") return {};
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

/** Dùng với `fetch` (Server Components) — axios không hỗ trợ `next.revalidate`. */
export async function fetchApiCached<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const authHeaders = await getAuthHeaders();

  // Khởi tạo Headers từ options.headers nếu có
  const headers = new Headers(options?.headers);
  
  // Thiết lập các header mặc định và auth
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  
  Object.entries(authHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  const isAuth = !!authHeaders.Authorization;

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers,
    ...(isAuth ? { cache: "no-store" } : { next: { revalidate: 300, ...options?.next } }),
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}
