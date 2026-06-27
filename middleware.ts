import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["ru", "ro"],
  defaultLocale: "ro",
  localePrefix: "always",
});

export default intlMiddleware;

export const config = {
  matcher: ["/", "/(ru|ro)/:path*"],
};
