import { Metadata } from "next";
import PrivacyPolicyPage from "@components/PrivacyPolicyPage/PrivacyPolicyPage";

export async function generateMetadata(props: {
  params: Promise<{ locale: "ru" | "ro" }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const title =
    locale === "ro"
      ? "Politica de confidențialitate - AquaViina"
      : "Политика конфиденциальности - AquaViina";
  const description =
    locale === "ro"
      ? "Informații despre prelucrarea datelor personale pe site-ul AquaViina."
      : "Информация об обработке персональных данных на сайте AquaViina.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://aquaviina.md/${locale}/privacy-policy`,
      languages: {
        ru: "https://aquaviina.md/ru/privacy-policy",
        ro: "https://aquaviina.md/ro/privacy-policy",
        "x-default": "https://aquaviina.md/ru/privacy-policy",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aquaviina.md/${locale}/privacy-policy`,
      siteName: "AquaViina",
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

const PrivacyPolicy = () => {
  return <PrivacyPolicyPage />;
};

export default PrivacyPolicy;
