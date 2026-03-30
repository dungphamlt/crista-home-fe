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
import type { AuthUser } from "@/types/auth";

const TOKEN_KEY = "crista-auth-token";
const USER_KEY = "crista-auth-user";

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
  logout: () => void;
  setSession: (accessToken: string, user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [authModal, setAuthModal] = useState<AuthModalMode | null>(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem(TOKEN_KEY);
      const u = readStoredUser();
      if (t && u) {
        setToken(t);
        setUser(u);
      }
    } finally {
      setIsReady(true);
    }
  }, []);

  const persist = useCallback((t: string, u: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
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
    (accessToken: string, u: AuthUser) => {
      persist(accessToken, normalizeUser(u as AuthUser & { id?: unknown }));
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
      persist(body.access_token, normalizeUser(body.user));
    },
    [persist],
  );

  const register = useCallback(
    async (payload: { email: string; password: string; name?: string }) => {
      const { data } = await api.post(endpoints.authRegister(), payload);
      const body = data as { access_token?: string; user?: AuthUser };
      if (body?.access_token && body?.user) {
        persist(body.access_token, normalizeUser(body.user));
        return { loggedIn: true };
      }
      return { loggedIn: false };
    },
    [persist],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
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
