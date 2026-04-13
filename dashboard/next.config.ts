import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://openweathermap.org/payload/api/media/file/*.png/"),
    ],
  },
  turbopack: {
    root: "/",
  },
  /* config options here */
};

export default nextConfig;
