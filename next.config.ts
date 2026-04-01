import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  outputFileTracingIncludes: {
    "/api/slack/interactions": [
      "./config/openai-bug-backlog-examples.md",
      "./config/openai-bug-style-guide.md",
    ],
    "/api/slack": [
      "./config/openai-bug-backlog-examples.md",
      "./config/openai-bug-style-guide.md",
    ],
  },
};

export default nextConfig;
