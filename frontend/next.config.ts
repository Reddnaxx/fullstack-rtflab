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
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
