/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
  };

//export default nextConfig;

export default {
  nextConfig,
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
};