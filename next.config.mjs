/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    remotePatterns: [{ hostname: "openweathermap.org" }],
  },
};

export default nextConfig;
