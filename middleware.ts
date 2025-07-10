import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ru", "ro"],
  defaultLocale: "ru",
});

export const config = {
  matcher: ["/", "/(ru|ro)/:path*"],
};
