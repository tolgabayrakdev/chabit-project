import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Frontend'teki istek URL’si
        destination: "https://vunqr-backend-production.up.railway.app/", // Gerçek backend URL’in
      },
    ];
  },
};

export default nextConfig;
