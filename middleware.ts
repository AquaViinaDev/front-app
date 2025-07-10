import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ru", "ro"],
  defaultLocale: "ru",
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(ru|ro)/:path*"],
};
