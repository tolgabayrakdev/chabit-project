const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vunqr-backend-production-0a80.up.railway.app/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "https://vunqr-backend-production-0a80.up.railway.app/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
