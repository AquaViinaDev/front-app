import { Metadata } from "next";

// Метаданные новой страницы: canonical + RU/RO
export const pageMeta = (
  locale: string,
  path: string,
  meta: { ru: { title: string; description: string }; ro: { title: string; description: string } }
): Metadata => {
  const current = locale === "ro" ? meta.ro : meta.ru;
  const url = `https://aquaviina.md/${locale}/${path}`;
  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: url,
      languages: {
        ru: `https://aquaviina.md/ru/${path}`,
        ro: `https://aquaviina.md/ro/${path}`,
        "x-default": `https://aquaviina.md/ro/${path}`,
      },
    },
    openGraph: { title: current.title, description: current.description, url, siteName: "Aqua Viina", type: "website" },
  };
};
