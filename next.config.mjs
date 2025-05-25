/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "http://localhost:3000", // Add your local development URL
    "http://10.96.0.52", // Add the IP address mentioned in the warning
  ],
};

export default nextConfig
