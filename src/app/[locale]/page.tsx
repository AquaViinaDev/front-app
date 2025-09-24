import { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

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

  const current = meta[locale as "ru" | "ro"] ?? meta["ru"];

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `https://aqua-viina.md/${locale}`,
      languages: {
        ru: "https://aqua-viina.md/ru",
        ro: "https://aqua-viina.md/ro",
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
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
