import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      { source: '/vice-player', destination: '/vice-player/index.html' },
      { source: '/vice-player/', destination: '/vice-player/index.html' },
    ]
  },
};

export default nextConfig;
