import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 90]
  },
  // Temporary setting to allow HMR over the current cloudflare tunnel
  // @ts-ignore
  allowedDevOrigins: ['millions-requests-trout-yet.trycloudflare.com'],
};

export default nextConfig;
