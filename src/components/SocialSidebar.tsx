"use client";

import Image from "next/image";
import facebookImg from "@/assets/images/facebook.png";
import zaloImg from "@/assets/images/zalo.png";
import shopeeImg from "@/assets/images/shopee.png";
import tiktokImg from "@/assets/images/tiktok.avif";
import phoneImg from "@/assets/images/phone.png";

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/tongkhoCristaHome",
    label: "Facebook",
    image: facebookImg,
    accent: "#1877F2",
  },
  {
    href: "https://zalo.me/0394510312",
    label: "Zalo",
    image: zaloImg,
    accent: "#0068FF",
  },
  // {
  //   href: "https://shopee.vn",
  //   label: "Shopee",
  //   image: shopeeImg,
  //   accent: "#EE4D2D",
  // },
  // {
  //   href: "https://www.tiktok.com",
  //   label: "TikTok",
  //   image: tiktokImg,
  //   accent: "#000000",
  // },
  {
    href: "tel:0394510312",
    label: "Hotline",
    image: phoneImg,
    accent: "#25D366",
  },
];

export function SocialSidebar() {
  return (
    <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-6 pl-2">
      {SOCIAL_LINKS.map(({ href, label, image, accent }, index) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          style={{ animationDelay: `${index * 80 + 150}ms` }}
          className="group relative bg-white rounded-full animate-pulse md:animate-social-sidebar-in transition-transform duration-200 ease-out hover:scale-[1.12] hover:translate-x-1.5 active:scale-[0.94]"
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow: `0 0 20px 2px ${accent}55`,
            }}
          />
          <span className="relative flex h-8 w-8 md:h-10 md:w-10 rounded-full items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110">
            <Image
              src={image}
              alt=""
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
              aria-hidden
            />
          </span>
        </a>
      ))}
    </div>
  );
}
