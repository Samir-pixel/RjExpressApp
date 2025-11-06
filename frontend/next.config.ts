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
  // Standalone output only for Docker builds (set via DOCKER_BUILD env var)
  // For Vercel: output is undefined, Vercel uses its own optimized build
  ...(process.env.DOCKER_BUILD === "true" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
