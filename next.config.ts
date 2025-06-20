import { createCivicAuthPlugin } from "@civic/auth/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    // 🚨 Danger: Allows production builds even with type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Optional: Skip ESLint errors in production build
    ignoreDuringBuilds: true,
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "a5fe326c-be75-43dd-9bca-7ccabc5fce41",
});

export default withCivicAuth(nextConfig);
