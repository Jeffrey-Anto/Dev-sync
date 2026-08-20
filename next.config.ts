import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/domains",
        destination: "/#domains",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
