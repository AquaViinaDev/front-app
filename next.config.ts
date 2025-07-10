import path from "path";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
    @import "variables.module.scss";
    @import "media.scss";
  `,
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test instanceof RegExp && rule.test.test(".svg")
    );
    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [/url/] },
          use: ["@svgr/webpack"],
        }
      );
      fileLoaderRule.exclude = /.svg$/i;
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
