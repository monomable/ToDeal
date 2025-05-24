/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'img.onemable.com'],
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
};

export default nextConfig;
