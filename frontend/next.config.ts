import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Panel photos are capped at 5 MB; the default action limit is 1 MB and
      // would reject them before our own validation could report why.
      bodySizeLimit: "6mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tqwdwdfxckgkkggwvzha.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
