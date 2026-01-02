import path from "path";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const DEFAULT_PUBLIC_API_URL = "https://aquaviina.md/api";

// ✅ Более гибкая конфигурация для изображений
const remotePatterns: RemotePattern[] = [
  // Localhost
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/**',
  },
  // IP сервера
  {
    protocol: 'http',
    hostname: '157.90.240.22',
    port: '3000',
    pathname: '/**',
  },
  // Docker internal service name
  {
    protocol: 'http',
    hostname: 'server',
    port: '3000',
    pathname: '/**',
  },
  // Production domain с HTTPS
  {
    protocol: 'https',
    hostname: 'aquaviina.md',
    pathname: '/api/**',
  },
  // Production WWW domain с HTTPS
  {
    protocol: 'https',
    hostname: 'www.aquaviina.md',
    pathname: '/api/**',
  },
  // Production domain с HTTP (на случай если нет SSL)
  {
    protocol: 'http',
    hostname: 'aquaviina.md',
    pathname: '/api/**',
  },
  // Production WWW domain с HTTP (на случай если нет SSL)
  {
    protocol: 'http',
    hostname: 'www.aquaviina.md',
    pathname: '/api/**',
  },
  // Любые изображения с aquaviina.md
  {
    protocol: 'https',
    hostname: 'aquaviina.md',
    pathname: '/**',
  },
  // Любые изображения с www.aquaviina.md
  {
    protocol: 'https',
    hostname: 'www.aquaviina.md',
    pathname: '/**',
  },
  {
    protocol: 'http',
    hostname: 'aquaviina.md',
    pathname: '/**',
  },
  {
    protocol: 'http',
    hostname: 'www.aquaviina.md',
    pathname: '/**',
  },
];

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
  // Avoid SWC minifier edge-case that can emit invalid tokens (returnNaN).
  swcMinify: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
      @use "global-styles" as *;
    `,
  },

  images: {
    remotePatterns,
    // ✅ Увеличиваем размеры и форматы
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // ✅ Отключаем минимизацию для дебага
    minimumCacheTTL: 60,
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
