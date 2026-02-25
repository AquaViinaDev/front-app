import { AboutPage } from "@components/AboutPage";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: "ru" | "ro" }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const titles: Record<"ru" | "ro", string> = {
    ru: "О компании AquaViina — Очистка воды в Молдове",
    ro: "Despre AquaViina — Purificarea apei în Moldova",
  };

  const descriptions: Record<"ru" | "ro", string> = {
    ru: "AquaViina — ваш эксперт по системам фильтрации воды. Узнайте больше о нашей миссии, опыте и подходе к обеспечению чистой воды для вашего дома и бизнеса.",
    ro: "AquaViina — expertul dumneavoastră în sisteme de filtrare a apei. Aflați mai multe despre misiunea noastră, experiența și abordarea noastră în asigurarea apei curate pentru locuința și afacerea dumneavoastră.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "ro_RO",
      url: `https://aquaviina.md/${locale}/about`,
      siteName: "AquaViina",
    },
    alternates: {
      canonical: `https://aquaviina.md/${locale}/about`,
      languages: {
        ru: "https://aquaviina.md/ru/about",
        ro: "https://aquaviina.md/ro/about",
        "x-default": "https://aquaviina.md/ru/about",
      },
    },
    twitter: {
      title: titles[locale],
      description: descriptions[locale],
      card: "summary_large_image",
    },
  };
}

const About = () => {
  return <AboutPage />;
};

export default About;
