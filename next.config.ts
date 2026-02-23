import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
} as unknown as NextConfig;

export default nextConfig;
