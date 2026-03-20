import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tránh lỗi MODULE_NOT_FOUND ./vendor-chunks/motion-dom.js (framer-motion + Next 15)
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cristahome.com.vn", pathname: "/**" },
      { protocol: "https", hostname: "cdn6364.cdn4s8.io.vn", pathname: "/**" },
      {
        protocol: "https",
        hostname: "pub-8f95df686d784f409dfe0a233df33d14.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
