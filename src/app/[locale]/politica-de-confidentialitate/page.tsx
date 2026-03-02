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
      canonical: `https://aquaviina.md/${locale}/politica-de-confidentialitate`,
      languages: {
        ru: "https://aquaviina.md/ru/politica-de-confidentialitate",
        ro: "https://aquaviina.md/ro/politica-de-confidentialitate",
        "x-default": "https://aquaviina.md/ru/politica-de-confidentialitate",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aquaviina.md/${locale}/politica-de-confidentialitate`,
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
