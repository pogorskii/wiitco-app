/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.igdb.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  staticPageGenerationTimeout: 300,
};

module.exports = nextConfig;
