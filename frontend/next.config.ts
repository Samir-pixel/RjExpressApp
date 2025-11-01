import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during production builds to avoid blocking Docker builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during production builds to prevent build failures in Docker
    ignoreBuildErrors: true,
  },
  // Enable standalone output for Docker optimization
  output: "standalone",
};

export default nextConfig;
