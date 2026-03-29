import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
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

const FACEBOOK_CRISTA = "https://www.facebook.com/CristaaHome";
const FACEBOOK_TEWA = "https://www.facebook.com/tewavietnam";

export function Footer() {
  return (
    <>
      <SocialSidebar />

      <footer className="pt-10 relative bg-gray-100 dark:bg-gray-800/50">
        {/* Newsletter bar */}
        <div className="bg-transparent absolute top-0 left-0 w-full translate-y-[-50%]">
          <div className="container bg-amber-gold rounded-lg py-6 md:py-8 ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_minmax(340px,1fr)_minmax(340px,1fr)] gap-6">
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
                      href="tel:0962453366"
                      className="hover:text-amber-gold transition-colors"
                    >
                      0962 45 3366
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <EmailIcon className="shrink-0 w-4 h-4 mt-0.5 text-gray-600 dark:text-gray-400" />
                    <a
                      href="mailto:ptcvietnam181@gmail.com"
                      className="hover:text-amber-gold transition-colors"
                    >
                      ptcvietnam181@gmail.com
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

              {/* Column 3 & 4: Fanpage — tạm thay iframe plugin bằng ảnh + icon + link (xem comment iframe cuối file) */}
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 text-sm">
                  Fanpage
                </h4>
                <FanpageCard
                  href={FACEBOOK_CRISTA}
                  title="Crista Home"
                  imageSrc={PLACEHOLDER_IMAGES.category}
                  imageAlt="Crista Home"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 text-sm">
                  Fanpage
                </h4>
                <FanpageCard
                  href={FACEBOOK_TEWA}
                  title="Gia Dụng Tewa Việt Nam"
                  imageSrc={PLACEHOLDER_IMAGES.banner}
                  imageAlt="Gia Dụng Tewa Việt Nam"
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

function FanpageCard({
  href,
  title,
  imageSrc,
  imageAlt,
}: {
  href: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm min-w-[340px]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-gold focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 rounded-lg"
      >
        <div className="relative aspect-17/10 w-full max-h-[200px] bg-gray-100 dark:bg-gray-700">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 340px"
            className="object-cover transition-opacity group-hover:opacity-95"
          />
        </div>
        <div className="flex items-center gap-3 p-3 border-t border-gray-100 dark:border-gray-700">
          <FacebookIcon className="w-8 h-8 shrink-0 text-[#1877F2]" />
          <span className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-amber-gold transition-colors">
            {title}
          </span>
        </div>
      </a>
    </div>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
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

/*
 * Facebook Page Plugin (iframe) — đã tắt tạm; bật lại: thay FanpageCard bằng:
 *
 * Crista:
 * <iframe
 *   src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_CRISTA)}&tabs=timeline&width=340&height=200&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`}
 *   width="340"
 *   height="200"
 *   style={{ border: "none", overflow: "hidden", minWidth: 340 }}
 *   scrolling="no"
 *   allowFullScreen
 *   allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
 *   title="Crista Home Facebook"
 *   className="w-full max-w-full"
 * />
 *
 * Tewa: cùng cấu trúc, đổi title + encodeURIComponent(FACEBOOK_TEWA).
 */
