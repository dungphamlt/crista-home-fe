"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api, endpoints } from "@/lib/api";
import {
  getAuthData,
  removeAuthData,
  setAuthData,
} from "@/lib/auth-cookie";
import type { AuthUser } from "@/types/auth";

export type AuthModalMode = "login" | "register";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isReady: boolean;
  isAuthenticated: boolean;
  authModal: AuthModalMode | null;
  openAuthModal: (mode: AuthModalMode) => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<{ loggedIn: boolean }>;
  logout: () => Promise<void>;
  setSession: (accessToken: string, user: AuthUser) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [authModal, setAuthModal] = useState<AuthModalMode | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { token: t, user: u } = await getAuthData();
        if (cancelled) return;
        setToken(t);
        setUser(u);
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onAuthChange = (e: Event) => {
      const ce = e as CustomEvent<{
        token: string | null;
        user: AuthUser | null;
      }>;
      setToken(ce.detail?.token ?? null);
      setUser(ce.detail?.user ?? null);
    };
    window.addEventListener("auth-storage-change", onAuthChange);
    return () =>
      window.removeEventListener("auth-storage-change", onAuthChange);
  }, []);

  const persist = useCallback(async (t: string, u: AuthUser) => {
    await setAuthData(t, u);
    setToken(t);
    setUser(u);
  }, []);

  const openAuthModal = useCallback((mode: AuthModalMode) => {
    setAuthModal(mode);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModal(null);
  }, []);

  const setSession = useCallback(
    async (accessToken: string, u: AuthUser) => {
      await persist(accessToken, normalizeUser(u as AuthUser & { id?: unknown }));
    },
    [persist],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await api.post(endpoints.authLogin(), {
        email,
        password,
      });
      const body = data as { access_token: string; user: AuthUser };
      if (!body?.access_token || !body?.user) {
        throw new Error("Phản hồi đăng nhập không hợp lệ");
      }
      await persist(body.access_token, normalizeUser(body.user));
    },
    [persist],
  );

  const register = useCallback(
    async (payload: { email: string; password: string; name?: string }) => {
      const { data } = await api.post(endpoints.authRegister(), payload);
      const body = data as { access_token?: string; user?: AuthUser };
      if (body?.access_token && body?.user) {
        await persist(body.access_token, normalizeUser(body.user));
        return { loggedIn: true };
      }
      return { loggedIn: false };
    },
    [persist],
  );

  const logout = useCallback(async () => {
    await removeAuthData();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isReady,
      isAuthenticated: Boolean(token && user),
      authModal,
      openAuthModal,
      closeAuthModal,
      login,
      register,
      logout,
      setSession,
    }),
    [
      user,
      token,
      isReady,
      authModal,
      openAuthModal,
      closeAuthModal,
      login,
      register,
      logout,
      setSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function normalizeUser(raw: AuthUser & { id?: unknown }): AuthUser {
  return {
    ...raw,
    id: String(raw.id ?? ""),
  };
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
