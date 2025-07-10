import { getRequestConfig as nextIntlGetRequestConfig } from "next-intl/server";

const routing = {
  locales: ["ru", "ro"],
  defaultLocale: "ru",
};

export default nextIntlGetRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = routing.locales.includes(requested ?? "") ? requested! : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
