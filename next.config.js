/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["msquarefdc.sgp1.digitaloceanspaces.com", "shorturl.at"],
    // domains: [], // Add the hostname(s) where your images are hosted
  },
};

module.exports = nextConfig;
