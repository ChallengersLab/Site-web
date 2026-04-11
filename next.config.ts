import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/sales", destination: "/offre#grow", permanent: true },
      { source: "/ia", destination: "/offre#build", permanent: true },
    ];
  },
};

export default nextConfig;
