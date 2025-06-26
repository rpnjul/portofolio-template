import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if necessary, but HTTPS is recommended for security
        hostname: "**", // This wildcard matches any hostname
      },
    ],
  },
};

export default nextConfig;
