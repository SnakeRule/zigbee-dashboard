import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    output: "standalone",
    images: {
      remotePatterns: [new URL("https://openweathermap.org/img/wn/*.png")],
    },
    ...(phase === PHASE_DEVELOPMENT_SERVER ? { turbopack: { root: "/" } } : {}),
  };
}
