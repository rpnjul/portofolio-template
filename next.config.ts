import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // jika portnya 3000
      },
      {
        protocol: "https", // or 'http' if necessary, but HTTPS is recommended for security
        hostname: "**", // This wildcard matches any hostname
      },
    ],
  },
};

export default nextConfig;
