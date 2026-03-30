import type { AuthUser } from "@/types/auth";

const AUTH_COOKIE_ENDPOINT = "/api/auth";

/** Cache đồng bộ cho axios (token trong httpOnly không đọc được từ document). */
let tokenCache: string | null = null;

export function getAuthTokenForApi(): string | null {
  return tokenCache;
}

function setTokenCache(token: string | null) {
  tokenCache = token;
}

/**
 * Lưu token + user qua Route Handler (httpOnly cookie), tránh lưu JWT trong localStorage.
 */
export async function setAuthData(
  token: string,
  user: AuthUser | null,
  expiresIn?: number,
): Promise<void> {
  const response = await fetch(`${AUTH_COOKIE_ENDPOINT}/set-cookie`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, user, expiresIn }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to set auth cookie");
  }

  setTokenCache(token);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("auth-storage-change", {
        detail: { token, user },
      }),
    );
  }
}

export async function getAuthData(): Promise<{
  token: string | null;
  user: AuthUser | null;
}> {
  try {
    const response = await fetch(`${AUTH_COOKIE_ENDPOINT}/get-cookie`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      setTokenCache(null);
      return { token: null, user: null };
    }

    const data = (await response.json()) as {
      token?: string | null;
      user?: AuthUser | null;
    };
    const token = data.token ?? null;
    setTokenCache(token);
    return {
      token,
      user: data.user ?? null,
    };
  } catch (e) {
    console.error("Error getting auth data:", e);
    setTokenCache(null);
    return { token: null, user: null };
  }
}

export async function removeAuthData(): Promise<void> {
  const response = await fetch(`${AUTH_COOKIE_ENDPOINT}/remove-cookie`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to remove auth cookie");
  }

  setTokenCache(null);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("auth-storage-change", {
        detail: { token: null, user: null },
      }),
    );
  }
}
