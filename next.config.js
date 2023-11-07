/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.giantbomb.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
