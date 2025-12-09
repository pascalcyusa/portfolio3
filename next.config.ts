import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error: allowedDevOrigins is valid but not in types yet
    allowedDevOrigins: ["10.243.72.100:3000"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'invensense.tdk.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // Often useful if using youtube thumbnails
      },
    ],
  },
};

export default nextConfig;
