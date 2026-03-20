import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import bgCrista from "@/assets/images/bg1.png";
import bgTewa from "@/assets/images/bg2.png";

export const metadata: Metadata = {
  title: "Giới thiệu - Crista Home & TEWA",
  description:
    "CRISTA HOME — tinh hoa thủy tinh decor. TEWA — gia dụng tinh giản hiện đại.",
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero — banner ngang (tỉ lệ cinematic), ảnh bg1 */}
      <section className="relative w-full overflow-hidden border-b border-white/10">
        {/* Chiều cao theo viewport → banner “dài” ngang; mobile vẫn đủ chỗ cho chữ */}
        <div className="relative w-full aspect-16/9">
          <Image
            src={bgCrista}
            alt="CRISTA HOME — ly thủy tinh tinh khiết trên nền ánh sáng ấm"
            fill
            className="object-cover object-[center_40%] sm:object-[center_35%] md:object-center"
            priority
            placeholder="blur"
            sizes="100vw"
          />
          {/* Phủ nhẹ để chữ nổi, giữ tông ấm */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-amber-950/25"
            aria-hidden
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <ScrollReveal className="w-full max-w-4xl">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/90 mb-3 md:mb-4 drop-shadow-md">
                CRISTA HOME
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.75rem] font-normal text-white leading-[1.2] text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
                Giới thiệu — Tôn vinh vẻ đẹp gia đình
              </h1>
              <p className="mt-3 md:mt-4 text-sm md:text-base text-white/85 max-w-xl mx-auto leading-relaxed drop-shadow-md">
                Hai thương hiệu, một tinh thần: thủy tinh nghệ thuật &amp; gia
                dụng tinh giản.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/san-pham"
                  className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-white bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 border border-amber-500/50 shadow-lg shadow-black/30 transition"
                >
                  Khám phá ngay
                </Link>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80">
                  <Link
                    href="/san-pham?brand=crista"
                    className="hover:text-white underline-offset-4 hover:underline transition"
                  >
                    CRISTA
                  </Link>
                  <span className="text-white/40">|</span>
                  <Link
                    href="/san-pham?brand=tewa"
                    className="hover:text-white underline-offset-4 hover:underline transition"
                  >
                    TEWA
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CRISTA — editorial: chữ trái · ảnh phải (mobile: ảnh trên) */}
      <section className="relative bg-white dark:bg-gray-950 py-16 md:py-24 lg:py-28">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="order-2 lg:order-1 min-w-0 space-y-8 lg:pr-4">
              <ScrollReveal>
                <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-amber-800/90 dark:text-amber-500/90">
                  Tinh hoa thủy tinh
                </p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-[2.75rem] font-bold text-gray-900 dark:text-white leading-[1.15] tracking-tight">
                  CRISTA HOME
                </h2>
                <p className="mt-4 font-serif text-lg md:text-xl italic text-stone-600 dark:text-stone-400 leading-relaxed">
                  Tinh hoa nghệ thuật thủy tinh decor
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="space-y-6 text-[15px] md:text-base text-gray-600 dark:text-gray-400 leading-[1.9] font-sans">
                  <p>
                    Tựa như ánh sáng được đúc kết trong hình khối,{" "}
                    <strong className="text-gray-900 dark:text-white font-medium">
                      CRISTA HOME
                    </strong>{" "}
                    mang đến những tác phẩm thủy tinh không chỉ để sử dụng — mà để chiêm
                    ngưỡng. Mỗi chiếc ly, bình, đĩa hay vật phẩm trang trí là sự giao hòa
                    hoàn mỹ giữa nghệ thuật thủ công tinh xảo và công nghệ hiện đại.
                  </p>
                  <p>
                    Chất liệu soda-lime cao cấp trong suốt như pha lê, phản chiếu ánh sáng rực
                    rỡ; từng đường vân lưới dập nổi tạo hiệu ứng lung linh. CRISTA tôn vinh
                    sự thanh lịch — từ ly nước hàng ngày đến quà tặng trang trọng, với tinh
                    thần đẳng cấp, tinh khiết và vĩnh cửu như ánh sáng.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <blockquote className="border-l-2 border-amber-700 dark:border-amber-500 pl-6 md:pl-8 py-1">
                  <p className="font-serif text-lg md:text-xl italic text-gray-800 dark:text-gray-100 leading-relaxed">
                    CRISTA HOME – Để mỗi khoảnh khắc trở nên lung linh.
                  </p>
                  <p className="mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400 not-italic font-sans leading-relaxed">
                    Một chạm nhẹ của ánh sáng, một tuyên ngôn của phong cách. Đẳng cấp nằm
                    trong từng chi tiết.
                  </p>
                </blockquote>
              </ScrollReveal>
            </div>

            <ScrollReveal className="order-1 lg:order-2" delay={0.05}>
              <figure className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none rounded-sm overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src={bgCrista}
                  alt="Sản phẩm thủy tinh CRISTA HOME"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                />
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TEWA — nền kem: lưới ảnh trái · chữ phải */}
      <section className="relative bg-[#f5f4f2] dark:bg-gray-900 py-16 md:py-24 lg:py-28">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Cột visual: 2×2 — ô vuông + thẻ + ảnh cao span 2 hàng */}
            <ScrollReveal className="order-1 w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
              <div className="grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 h-[min(72vw,420px)] sm:h-[400px] md:h-[440px] lg:h-[min(480px,52vh)]">
                <div className="relative row-start-1 col-start-1 rounded-lg overflow-hidden shadow-md bg-stone-200 dark:bg-gray-800 min-h-0">
                  <Image
                    src={bgTewa}
                    alt="Chi tiết sản phẩm TEWA"
                    fill
                    className="object-cover object-[15%_30%] sm:object-[20%_center]"
                    sizes="(max-width: 1024px) 45vw, 280px"
                    placeholder="blur"
                  />
                </div>
                <div className="row-span-2 col-start-2 relative rounded-lg overflow-hidden shadow-md bg-stone-200 dark:bg-gray-800 min-h-0">
                  <Image
                    src={bgTewa}
                    alt="Không gian và sản phẩm TEWA"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 320px"
                    placeholder="blur"
                  />
                </div>
                <div className="row-start-2 col-start-1 flex flex-col items-center justify-center rounded-lg bg-white dark:bg-gray-800 shadow-md px-3 py-6 text-center min-h-0">
                  <span className="font-serif text-3xl sm:text-4xl text-amber-800 dark:text-amber-500 leading-none">
                    02
                  </span>
                  <span className="mt-2 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                    Bền vững
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <div className="order-2 min-w-0 space-y-8 lg:pl-2">
              <ScrollReveal>
                <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                  Gia dụng hiện đại
                </p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-[2.75rem] font-bold text-gray-900 dark:text-white leading-[1.1]">
                  TEWA
                </h2>
                <p className="mt-4 font-serif text-lg md:text-xl italic text-stone-600 dark:text-stone-400">
                  Tinh giản hiện đại — Tôn vinh vẻ đẹp bền vững
                </p>
                <p className="mt-6 text-base md:text-lg font-semibold text-gray-900 dark:text-white font-sans leading-snug">
                  &ldquo;Simple is smart – Đơn giản là thông minh&rdquo;
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="space-y-6 text-[15px] md:text-base text-gray-600 dark:text-gray-400 leading-[1.9] font-sans">
                  <p>
                    Nếu CRISTA là tiếng thì thầm của ánh sáng, thì{" "}
                    <strong className="text-gray-900 dark:text-white font-medium">TEWA</strong>{" "}
                    là hơi thở của sự tinh giản và tiện nghi. Thương hiệu tạo nên gia dụng
                    tinh gọn, bền bỉ — tổ ấm an yên, cân bằng giữa công năng và thẩm mỹ.
                  </p>
                  <p>
                    Mỗi sản phẩm được tạo tác tỉ mỉ, chất liệu chọn lọc, hướng đến bền vững
                    và hài hòa trong không gian. TEWA truyền cảm hứng sống gọn gàng — nơi
                    mọi vật dụng đều có ý nghĩa riêng trong tổng thể tổ ấm.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.14}>
                <div className="flex items-center gap-4 pt-2">
                  <span className="h-px w-10 sm:w-14 bg-gray-900/25 dark:bg-white/30 shrink-0" />
                  <Link
                    href="/san-pham?brand=tewa"
                    className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-gray-900 dark:text-white hover:text-amber-800 dark:hover:text-amber-400 transition inline-flex items-center gap-1"
                  >
                    Khám phá TEWA
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.18}>
                <p className="font-serif text-lg italic text-gray-800 dark:text-gray-200 border-l-2 border-gray-900/20 dark:border-white/25 pl-6">
                  TEWA – Sống tinh giản, chạm đến hoàn mỹ. Cân đối thẩm mỹ và công năng,
                  hiện đại và bền lâu.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA cuối */}
      <section className="py-14 md:py-20 bg-amber-gold/15 dark:bg-amber-900/20 border-t border-amber-gold/20">
        <div className="container text-center max-w-2xl">
          <ScrollReveal>
            <p className="text-gray-800 dark:text-gray-200 text-lg mb-6">
              CRISTAhome & TEWA — Cùng đồng hành kiến tạo không gian sống của
              bạn.
            </p>
            <Link
              href="/san-pham"
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-amber-gold text-white font-semibold hover:opacity-95 transition shadow-lg shadow-amber-900/15"
            >
              Xem tất cả sản phẩm
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
