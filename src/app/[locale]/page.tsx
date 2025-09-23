import { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export async function generateMetadata({
  params,
}: {
  params: { locale: "ru" | "ro" };
}): Promise<Metadata> {
  const { locale } = params;

  const meta = {
    ru: {
      title: "Фильтры для воды в Молдове — AquaViina",
      description:
        "Интернет-магазин AquaViina: фильтры для воды, картриджи, системы обратного осмоса. Доставка по Кишинёву и всей Молдове. Чистая вода — залог здоровья!",
    },
    ro: {
      title: "Filtre de apă în Moldova — AquaViina",
      description:
        "Magazin online AquaViina: filtre de apă, cartușe și sisteme de osmoză inversă. Livrare rapidă în Chișinău și în toată Moldova. Apă curată pentru sănătatea ta!",
    },
  };

  return {
    title: meta[locale].title,
    description: meta[locale].description,
    alternates: {
      canonical: `https://aqua-viina.md/${locale}`,
      languages: {
        ru: "https://aqua-viina.md/ru",
        ro: "https://aqua-viina.md/ro",
      },
    },
    openGraph: {
      title: meta[locale].title,
      description: meta[locale].description,
      url: `https://aqua-viina.md/${locale}`,
      siteName: "AquaViina",
      type: "website",
    },
  };
}

const Home = () => {
  return <HomePage />;
};

export default Home;
