"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tewaOpen, setTewaOpen] = useState(false);
  const [cristaOpen, setCristaOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/san-pham?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/tin-tuc", label: "Tin tức" },
    { href: "/lien-he", label: "Liên hệ" },
  ];
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      {/* Top bar - Golden yellow */}
      <div className="bg-amber-gold dark:bg-amber-700 text-white/95 text-sm">
        <div className="container py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Chào mừng bạn đến với website chúng tôi</span>
            <div className="flex items-center gap-6">
              <a
                href="mailto:ptcvietnam181@gmail.com"
                className="flex items-center gap-1.5 hover:underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email: ptcvietnam181@gmail.com
              </a>
              <a
                href="tel:0962453366"
                className="flex items-center gap-1.5 hover:underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Hotline: 0962 45 3366
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle - Logo, Search, Account */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-1 shrink-0">
              <span className="text-2xl font-serif text-gray-900 dark:text-white tracking-tight">
                CRISTA
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-light -ml-0.5">
                home
              </span>
              <span className="text-gray-400 dark:text-gray-500 mx-1"> & </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                TEWA
              </span>
              <span className="text-xs text-amber-800 dark:text-amber-600 ml-0.5">
                テワ
              </span>
            </Link>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex-1 w-full max-w-md mx-auto lg:mx-8"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Từ khóa tìm kiếm"
                  className="w-full pl-4 pr-12 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-400/50"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-amber-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Account, Wishlist, Cart */}
            <div className="flex items-center gap-6 shrink-0">
              <Link
                href="/tai-khoan"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Tài khoản
              </Link>
              <Link
                href="/yeu-thich"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm relative"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Yêu thích
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link
                href="/gio-hang"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm relative"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Giỏ hàng
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav - Golden yellow */}
      <div className="">
        <div className="container py-2">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6">
            {/* DANH MỤC button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-gold text-white font-medium shrink-0 lg:mr-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              DANH MỤC
            </button>

            {/* Nav links */}
            <nav className="hidden flex-1 lg:flex items-center gap-1 flex-wrap justify-between">
              <Link
                href="/"
                className={`px-4 py-2 rounded-full bg-amber-gold-light hover:text-amber-gold font-semibold text-sm ${isActive("/") ? "text-amber-gold" : ""}`}
              >
                Trang chủ
              </Link>
              <Link
                href="/gioi-thieu"
                className={`px-4 py-2 rounded-full bg-amber-gold-light hover:text-amber-gold font-semibold text-sm ${isActive("/gioi-thieu") ? "text-amber-gold" : ""}`}
              >
                Giới thiệu
              </Link>
              <div className="relative">
                <button
                  onClick={() => {
                    setTewaOpen(!tewaOpen);
                    setCristaOpen(false);
                  }}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full bg-amber-gold-light hover:text-amber-gold font-semibold text-sm ${isActive("/san-pham?brand=tewa") ? "text-amber-gold" : ""}`}
                >
                  TEWA
                  <svg
                    className={`w-4 h-4 transition ${tewaOpen ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {tewaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[180px] z-50"
                    >
                      <Link
                        href="/san-pham?brand=tewa"
                        onClick={() => setTewaOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                      >
                        Sản phẩm TEWA
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setCristaOpen(!cristaOpen);
                    setTewaOpen(false);
                  }}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full bg-amber-gold-light hover:text-amber-gold font-semibold text-sm ${isActive("/san-pham?brand=crista") ? "text-amber-gold" : ""}`}
                >
                  CRISTA
                  <svg
                    className={`w-4 h-4 transition ${cristaOpen ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {cristaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[180px] z-50"
                    >
                      <Link
                        href="/san-pham?brand=crista"
                        onClick={() => setCristaOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                      >
                        Sản phẩm CRISTA
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                href="/tin-tuc"
                className={`px-4 py-2 rounded-full bg-amber-gold-light hover:text-amber-gold font-semibold text-sm ${isActive("/tin-tuc") ? "text-amber-gold" : ""}`}
              >
                Tin tức
              </Link>
              <Link
                href="/lien-he"
                className={`px-4 py-2 rounded-full bg-amber-gold-light hover:text-amber-gold font-semibold text-sm ${isActive("/lien-he") ? "text-amber-gold" : ""}`}
              >
                Liên hệ
              </Link>
            </nav>

            {/* Red CTA - Hotline */}
            <a
              href="tel:0962453366"
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold ml-auto shrink-0"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              0962 45 3366
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-amber-600/90"
            >
              <div className="container py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-white hover:bg-white/20 rounded-lg px-4"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/san-pham"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-white hover:bg-white/20 rounded-lg px-4"
                >
                  Sản phẩm
                </Link>
                <Link
                  href="/gio-hang"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-white hover:bg-white/20 rounded-lg px-4"
                >
                  Giỏ hàng
                </Link>
                <Link
                  href="/don-hang"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-white hover:bg-white/20 rounded-lg px-4"
                >
                  Tra cứu đơn
                </Link>
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileOpen(false);
                  }}
                  className="py-2 text-left text-white hover:bg-white/20 rounded-lg px-4"
                >
                  {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
