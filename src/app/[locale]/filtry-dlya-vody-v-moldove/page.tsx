import { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@components/SeoLanding/SeoLandingPage";

type PageProps = {
  params: Promise<{ locale: "ru" | "ro" }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "ru") {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = "Фильтр для воды в Молдове — купить с доставкой | AquaViina";
  const description =
    "Подбор и продажа фильтров для воды в Молдове: обратный осмос, проточные системы, картриджи. Доставка по Кишинёву и всей стране.";
  const canonical = "https://aquaviina.md/ru/filtry-dlya-vody-v-moldove";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "ru-MD": canonical,
        "ro-MD": "https://aquaviina.md/ro/filtre-apa-moldova",
        ru: canonical,
        ro: "https://aquaviina.md/ro/filtre-apa-moldova",
        "x-default": canonical,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
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

const WaterFiltersInMoldovaRuPage = async ({ params }: PageProps) => {
  const { locale } = await params;

  if (locale !== "ru") {
    notFound();
  }

  return <SeoLandingPage locale="ru" />;
};

export default WaterFiltersInMoldovaRuPage;
