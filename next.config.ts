import path from "path";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const defaultImageHosts = [
  "http://localhost:3000",
  "http://157.90.240.22:3000",
];

const parseRemotePattern = (target: string): RemotePattern => {
  const url = new URL(target);

  return {
    protocol: url.protocol.replace(/:$/, ""),
    hostname: url.hostname,
    port: url.port || undefined,
    pathname: url.pathname !== "/" ? url.pathname : undefined,
  };
};

const imageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS || "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

const remotePatterns: RemotePattern[] = (imageHosts.length
  ? imageHosts
  : defaultImageHosts
).map(parseRemotePattern);

const nextConfig: NextConfig = {
  // ✅ Игнорировать ошибки линтера при билде
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Игнорировать ошибки TypeScript при билде
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Standalone output for Docker
  output: 'standalone',

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
      @use "global-styles" as *;
    `,
  },

  images: {
    remotePatterns,
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test instanceof RegExp && rule.test.test(".svg")
    );

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [/url/] },
          use: ["@svgr/webpack"],
        }
      );
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default withNextIntl(nextConfig);