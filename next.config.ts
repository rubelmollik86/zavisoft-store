import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "placeimg.com" },
      { protocol: "https", hostname: "api.lorem.space" },
      { protocol: "https", hostname: "**.platzi.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "**.escuelajs.co" },
    ],
  },
};

export default nextConfig;
