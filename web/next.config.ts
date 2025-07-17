const nextConfig = {
  async rewrites() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${baseUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
