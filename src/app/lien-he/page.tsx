import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { NavLinks } from "@/components/NavLinks";

export const metadata: Metadata = {
  title: "Liên hệ - Crista Home",
  description:
    "Liên hệ Crista Home & TEWA — tư vấn sản phẩm, địa chỉ 181 Nguyễn Lương Bằng, Hà Nội.",
};

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=181+Nguy%E1%BB%85n+L%C6%B0%E1%BB%9Dng+B%E1%BA%B1ng,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i&output=embed";

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container">
        <NavLinks
          items={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
        />
      </div>
      {/* Form + ảnh */}
      <section className="py-12">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            <div className="lg:col-span-5 order-1">
              <div className="relative aspect-4/5 max-h-[520px] w-full mx-auto lg:max-h-none rounded-2xl overflow-hidden shadow-lg shadow-gray-200/80 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                  alt="Đội ngũ hỗ trợ khách hàng"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-2 min-w-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Thông tin + bản đồ */}
      <section className="bg-[#f5f5f4] dark:bg-gray-900/80 border-t border-gray-200/80 dark:border-gray-800 py-14 md:py-20 lg:py-24">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Thông tin liên hệ
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                Thông tin trụ sở và các kênh liên lạc của chúng tôi.
              </p>

              <div className="mt-8 flex flex-col gap-4 flex-1">
                <div className="flex gap-3">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300">
                    <MapPinIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      Địa chỉ
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      181 Nguyễn Lương Bằng, Đống Đa, Hà Nội
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300">
                    <MailIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      Email
                    </p>
                    <a
                      href="mailto:ptcvietnam181@gmail.com"
                      className="mt-1 text-sm text-slate-600 dark:text-gray-400 hover:text-amber-gold dark:hover:text-amber-400 transition break-all"
                    >
                      cristahomedecor@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300">
                    <PhoneIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      Hotline
                    </p>
                    <a
                      href="tel:0962453366"
                      className="mt-1 text-sm text-slate-600 dark:text-gray-400 hover:text-amber-gold dark:hover:text-amber-400 transition"
                    >
                      0394510312
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300">
                    <ClockIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      Giờ làm việc
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      T2 - T6: 8h - 17h30
                      <br />
                      T7 - CN: 8h - 16h30
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 min-h-[300px] lg:min-h-[420px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-gray-200 dark:bg-gray-800">
              <iframe
                title="Bản đồ Crista Home — 181 Nguyễn Lương Bằng, Hà Nội"
                src={MAP_EMBED_SRC}
                className="w-full h-full min-h-[300px] lg:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
