"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AccountPage() {
  const { user, isReady, isAuthenticated, logout, openAuthModal } = useAuth();
  const router = useRouter();

  if (!isReady) {
    return (
      <div className="container py-20 text-center text-gray-500 text-sm">
        Đang tải…
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container pt-12 pb-20 max-w-lg mx-auto text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Tài khoản
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Đăng nhập để xem thông tin tài khoản của bạn.
        </p>
        <button
          type="button"
          onClick={() => openAuthModal("login")}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-md hover:from-amber-400 hover:to-amber-500"
        >
          Đăng nhập
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={() => openAuthModal("register")}
            className="text-amber-700 dark:text-amber-400 font-medium hover:underline"
          >
            Đăng ký
          </button>
        </p>
        <p className="mt-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-amber-600">
            ← Về trang chủ
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container pt-8 pb-16 md:pb-24 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Tài khoản
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        Thông tin đăng nhập của bạn
      </p>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Email
          </p>
          <p className="text-gray-900 dark:text-white mt-1">{user.email}</p>
        </div>
        {user.name && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Họ tên
            </p>
            <p className="text-gray-900 dark:text-white mt-1">{user.name}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Vai trò
          </p>
          <p className="text-gray-900 dark:text-white mt-1">{user.role}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
            router.refresh();
          }}
          className="rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition w-full sm:w-auto"
        >
          Đăng xuất
        </button>
      </div>

      <p className="mt-8 text-center text-sm">
        <Link href="/" className="text-amber-700 dark:text-amber-400 hover:underline">
          ← Về trang chủ
        </Link>
      </p>
    </div>
  );
}
