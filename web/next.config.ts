const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vunqr-backend-production.up.railway.app/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "https://vunqr-backend-production.up.railway.app/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
