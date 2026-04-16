import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";
import { SocialSidebar } from "./SocialSidebar";

const POLICY_LINKS = [
  {
    href: "/chinh-sach/chinh-sach-va-quy-dinh-chung",
    label: "Chính sách và quy định chung",
  },
  { href: "/chinh-sach/chinh-sach-thanh-toan", label: "Chính sách thanh toán" },
  { href: "/chinh-sach/chinh-sach-giao-nhan", label: "Chính sách giao nhận" },
  {
    href: "/chinh-sach/chinh-sach-doi-tra",
    label: "Chính sách đổi trả sản phẩm",
  },
  // {
  //   href: "/yeu-cau-xoa-du-lieu",
  //   label: "Yêu cầu xóa dữ liệu (Facebook)",
  // },
];

const FACEBOOK_CRISTA = "https://www.facebook.com/tongkhoCristaHome";

export function Footer() {
  return (
    <>
      <SocialSidebar />

      <footer className="pt-10 mt-10 md:mt-20 relative bg-gray-100 dark:bg-gray-800/50">
        {/* Newsletter bar */}
        <div className="bg-transparent absolute top-0 left-0 w-full translate-y-[-50%]">
          <div className="container">
            <div className="bg-amber-gold rounded-2xl px-6 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-bold text-white uppercase tracking-wide text-lg md:text-xl">
                  Đăng ký nhận tin
                </h3>
                <p className="text-white/95 text-sm mt-1">
                  Nhận thông tin sản phẩm mới nhất và các chương trình khuyến
                  mãi.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Main info columns */}
        <div className="bg-transparent py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_minmax(340px,1.2fr)] gap-6">
              {/* Column 1: Thông tin website */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 text-sm">
                  Thông tin website
                </h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm font-medium">
                  <li className="flex gap-3">
                    <LocationIcon className="shrink-0 w-4 h-4 mt-0.5 text-gray-600 dark:text-gray-400" />
                    <span>181 Nguyễn Lương Bằng, Đống Đa, Hà Nội</span>
                  </li>
                  <li className="flex gap-3">
                    <PhoneIcon className="shrink-0 w-4 h-4 mt-0.5 text-gray-600 dark:text-gray-400" />
                    <a
                      href="tel:0394510312"
                      className="hover:text-amber-gold transition-colors"
                    >
                      0394510312
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <EmailIcon className="shrink-0 w-4 h-4 mt-0.5 text-gray-600 dark:text-gray-400" />
                    <a
                      href="mailto:cristahomedecor@gmail.com"
                      className="hover:text-amber-gold transition-colors"
                    >
                      cristahomedecor@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Chính sách */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 text-sm">
                  Chính sách
                </h4>
                <ul className="space-y-2 font-medium">
                  {POLICY_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-gray-700 dark:text-gray-300 text-sm hover:text-amber-gold transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Fanpage */}
              <div className="min-w-0 md:col-span-2 lg:col-span-1">
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 text-sm">
                  Fanpage
                </h4>
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_CRISTA)}&tabs=timeline&width=400&height=260&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                  width="100%"
                  height="260"
                  style={{
                    border: "none",
                    overflow: "hidden",
                    minWidth: "100%",
                  }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Crista Home Facebook"
                  className="w-full max-w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="bg-amber-gold py-4">
          <div className="container text-center">
            <p className="text-gray-900 dark:text-gray-900 font-medium text-sm">
              {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
