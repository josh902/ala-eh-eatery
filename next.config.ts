import type { NextConfig } from "next";

const nextConfig = {
  images: {
    qualities: [100, 75],
  },
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
  },
  allowedDevOrigins: ["192.168.233.1"],
} as NextConfig;

export default nextConfig;
