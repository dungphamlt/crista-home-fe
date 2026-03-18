import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cristahome.com.vn", pathname: "/**" },
      { protocol: "https", hostname: "cdn6364.cdn4s8.io.vn", pathname: "/**" },
    ],
  },
};

export default nextConfig;
