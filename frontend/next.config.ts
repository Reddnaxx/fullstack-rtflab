import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'placehold.co',
      },
      {
        hostname: 'localhost',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
