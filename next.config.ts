 import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.your-static-cdn-domain.com', // Replace with your static site domain
        pathname: '/**',
      },
    ],
  },
  // Controls dev server HMR/DevTools access across local network
  allowedDevOrigins: ["100.127.178.13", "local-origin.dev", "*.local-origin.dev"],
};

export default nextConfig;