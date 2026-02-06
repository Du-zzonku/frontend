/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    return [
      {
        source: '/glb/:path*',
        destination: `${backendUrl}/glb/:path*`,
      },
      {
        source: '/thumbs/:path*',
        destination: `${backendUrl}/thumbs/:path*`,
      },
    ];
  },
};

export default nextConfig;
