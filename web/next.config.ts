const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:1234/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:1234/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
