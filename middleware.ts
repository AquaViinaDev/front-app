import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ru", "ro"],
  defaultLocale: "ro",
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(ru|ro)/:path*"],
};
