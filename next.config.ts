import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lucide-react ships 4,000+ icons behind a barrel file; rewrite to direct imports.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "motion/react"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [420, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
  },

  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        source: "/:file*.(avif|webp|jpg|jpeg|png|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
