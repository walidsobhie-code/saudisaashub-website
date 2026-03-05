/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Dynamic for searchParams routes - works on Vercel/Netlify/Cloudflare
  dynamicParams: true,
};

module.exports = nextConfig;
