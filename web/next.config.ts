const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vunqr-backend-production.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
