import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
