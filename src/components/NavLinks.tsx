import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export type NavLinkItem = {
  label: string;
  /** Có `href` → `<Link>`; không có → text (mục hiện tại hoặc nhãn giữa) */
  href?: string;
  /**
   * `emphasis`: chữ đậm (vd. “Sản phẩm”, “Tin tức” khi là link giữa).
   * `default`: xám + hover amber (vd. “Trang chủ”).
   */
  variant?: "default" | "emphasis";
};

type NavLinksProps = {
  items: NavLinkItem[];
  className?: string;
  /** Ký tự giữa các mục (mặc định `>` màu amber-gold) */
  separator?: ReactNode;
};

function linkClassName(index: number, variant: NavLinkItem["variant"]) {
  if (variant === "emphasis") {
    return "text-gray-900 dark:text-white hover:text-amber-gold transition-colors";
  }
  return "text-gray-500 dark:text-gray-400 hover:text-amber-gold transition-colors";
}

function spanClassName(isLast: boolean) {
  if (isLast) return "text-gray-900 dark:text-white";
  return "text-gray-600 dark:text-gray-300";
}

export function NavLinks({
  items,
  className = "",
  separator = ">",
}: NavLinksProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Điều hướng dạng đường dẫn"
      className={`mb-6 text-sm text-gray-500 dark:text-gray-400 ${className}`.trim()}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const key = `crumb-${index}`;

        return (
          <Fragment key={key}>
            {index > 0 && (
              <span className="mx-2 text-amber-gold" aria-hidden>
                {separator}
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={linkClassName(index, item.variant)}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={spanClassName(isLast)}
                {...(isLast ? { "aria-current": "page" as const } : {})}
              >
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
