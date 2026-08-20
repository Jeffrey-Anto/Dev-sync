import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
