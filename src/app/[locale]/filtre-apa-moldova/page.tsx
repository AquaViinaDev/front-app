import { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@components/SeoLanding/SeoLandingPage";

type PageProps = {
  params: Promise<{ locale: "ru" | "ro" }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "ro") {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = "Filtre de apă în Moldova — cumpără cu livrare | AquaViina";
  const description =
    "Alegere și vânzare filtre de apă în Moldova: osmoză inversă, filtre sub chiuvetă, cartușe. Livrare în Chișinău și în toată țara.";
  const canonical = "https://aquaviina.md/ro/filtre-apa-moldova";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "ru-MD": "https://aquaviina.md/ru/filtry-dlya-vody-v-moldove",
        "ro-MD": canonical,
        ru: "https://aquaviina.md/ru/filtry-dlya-vody-v-moldove",
        ro: canonical,
        "x-default": "https://aquaviina.md/ru/filtry-dlya-vody-v-moldove",
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

const WaterFiltersInMoldovaRoPage = async ({ params }: PageProps) => {
  const { locale } = await params;

  if (locale !== "ro") {
    notFound();
  }

  return <SeoLandingPage locale="ro" />;
};

export default WaterFiltersInMoldovaRoPage;
