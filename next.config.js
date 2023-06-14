/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com"],
  },
  env: {
    AUTH_BASE_URL: process.env.AUTH_BASE_URL,
  },
};

module.exports = nextConfig;
