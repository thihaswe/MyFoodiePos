/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["shorturl.at"], // Add the hostname(s) where your images are hosted
  },
};

module.exports = nextConfig;
