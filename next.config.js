/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["source.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "engage-prod-v1.s3.us-east-1.amazonaws.com",
      },
    ],
  },
  env: {
    AUTH_BASE_URL: process.env.AUTH_BASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
