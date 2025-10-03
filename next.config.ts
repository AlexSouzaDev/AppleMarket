import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack uses this project directory as root to avoid
    // selecting the wrong lockfile when multiple are present.
    root: process.cwd(),
  },
};

export default nextConfig;
