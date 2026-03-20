"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { api, endpoints } from "@/lib/api";

export type NavCategory = {
  _id: string;
  name: string;
  slug: string;
};

type BrandMegaMenuProps = {
  label: string;
  brandHref: string;
  rootParentId: string;
  isActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeSibling: () => void;
};

export function BrandMegaMenu({
  label,
  brandHref,
  rootParentId,
  isActive,
  isOpen,
  onOpen,
  onClose,
  closeSibling,
}: BrandMegaMenuProps) {
  const [level2, setLevel2] = useState<NavCategory[]>([]);
  const [hoveredL2, setHoveredL2] = useState<string | null>(null);
  const [l3ByParent, setL3ByParent] = useState<Record<string, NavCategory[]>>({});
  const [loadingL3, setLoadingL3] = useState<string | null>(null);
  const l3RequestedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get(
          endpoints.categories({ parentId: rootParentId, withCount: true }),
        );
        const raw = res.data;
        const data = Array.isArray(raw)
          ? raw
          : (raw as { data?: NavCategory[] })?.data;
        if (!cancelled) setLevel2(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setLevel2([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [rootParentId]);

  const loadL3 = useCallback(async (parentId: string) => {
    if (l3RequestedRef.current.has(parentId)) return;
    l3RequestedRef.current.add(parentId);
    setLoadingL3(parentId);
    try {
      const res = await api.get(endpoints.categories({ parentId, withCount: true }));
      const raw = res.data;
      const data = Array.isArray(raw)
        ? raw
        : (raw as { data?: NavCategory[] })?.data;
      const arr = Array.isArray(data) ? data : [];
      setL3ByParent((prev) => ({ ...prev, [parentId]: arr }));
    } catch {
      setL3ByParent((prev) => ({ ...prev, [parentId]: [] }));
    } finally {
      setLoadingL3((id) => (id === parentId ? null : id));
    }
  }, []);

  const handleL2Enter = (id: string) => {
    setHoveredL2(id);
    void loadL3(id);
  };

  const handleMouseEnterRoot = () => {
    closeSibling();
    onOpen();
  };

  const handleMouseLeaveRoot = () => {
    onClose();
    setHoveredL2(null);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnterRoot}
      onMouseLeave={handleMouseLeaveRoot}
    >
      <button
        type="button"
        className={`flex items-center gap-1 px-4 py-2 rounded-full bg-amber-gold-light hover:text-amber-gold font-semibold text-sm ${isActive ? "text-amber-gold" : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`}
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
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 flex pt-1"
          >
            {/* Cột cấp 2 */}
            <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 py-2 min-w-[220px] max-h-[min(70vh,420px)] overflow-y-auto">
              <Link
                href={brandHref}
                className="block px-4 py-2 text-sm font-semibold text-amber-gold hover:bg-amber-50 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                Tất cả sản phẩm {label}
              </Link>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
              {level2.length === 0 ? (
                <p className="px-4 py-3 text-sm text-gray-500">Đang tải…</p>
              ) : (
                level2.map((cat) => {
                  const l3 = l3ByParent[cat._id];
                  const loading = loadingL3 === cat._id;
                  const showL3Panel =
                    hoveredL2 === cat._id &&
                    (loading || l3 === undefined || l3.length > 0);

                  return (
                    <div
                      key={cat._id}
                      className="relative"
                      onMouseEnter={() => handleL2Enter(cat._id)}
                    >
                      <Link
                        href={`/danh-muc/${cat.slug}`}
                        className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                        onClick={onClose}
                      >
                        <span>{cat.name}</span>
                        <svg
                          className="w-4 h-4 shrink-0 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>

                      {/* Cột cấp 3 — hiện khi hover cấp 2 */}
                      {showL3Panel && (
                        <div className="absolute left-full top-0 bottom-auto pl-1 -ml-px min-h-full">
                          <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 py-2 min-w-[200px] max-h-[min(70vh,420px)] overflow-y-auto">
                            {loading && l3 === undefined ? (
                              <p className="px-4 py-3 text-sm text-gray-500">Đang tải…</p>
                            ) : (
                              l3?.map((sub) => (
                                <Link
                                  key={sub._id}
                                  href={`/danh-muc/${sub.slug}`}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 whitespace-nowrap"
                                  onClick={onClose}
                                >
                                  {sub.name}
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
