import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tránh lỗi MODULE_NOT_FOUND ./vendor-chunks/motion-dom.js (framer-motion + Next 15)
  transpilePackages: ["framer-motion"],
  images: {
    unoptimized: true, // Disable Vercel Image Optimization hoàn toàn
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
