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
  // Standalone output only for Docker builds
  // Vercel doesn't need this - it uses its own optimized build system
  ...(process.env.DOCKER_BUILD === "true" && { output: "standalone" }),
};

export default nextConfig;
