/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable SQLite-specific build issues
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Prevent SQLite-related modules from being bundled
      '@prisma/client': false,
    }
    return config
  },
}

module.exports = nextConfig

