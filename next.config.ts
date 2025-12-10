import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
