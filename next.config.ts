import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
  @import "variables.module.scss";
  @import "media.scss";
`,
  },
};

export default nextConfig;
