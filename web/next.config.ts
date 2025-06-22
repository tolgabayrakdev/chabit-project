import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // Frontend'den gelen istekler
        destination: "https://vunqr-backend-production.up.railway.app/api/:path*",  // Backend API adresin
      },
    ];
  },
};

export default nextConfig;
