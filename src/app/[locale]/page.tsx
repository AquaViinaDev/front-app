import { Metadata } from "next";
import { HomePage } from "@components/HomePage";
import { FAQ } from "@components/wf/content";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const meta = {
    ru: {
      title: "Фильтр для воды в Молдове — купить в Aqua Viina",
      description:
        "Купить фильтр для воды в Молдове: обратный осмос, проточные и магистральные фильтры, картриджи. Aqua Viina, доставка по Кишинёву и всей Молдове, установка и сервис.",
    },
    ro: {
      title: "Filtre de apă în Moldova — Aqua Viina",
      description:
        "Magazin online Aqua Viina: filtre de apă, cartușe și sisteme de osmoză inversă. Livrare rapidă în Chișinău și în toată Moldova. Apă curată pentru sănătatea ta!",
    },
  };

  const current = meta[locale as "ru" | "ro"] ?? meta["ru"];

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `https://aquaviina.md/${locale}`,
      languages: {
        ru: "https://aquaviina.md/ru",
        ro: "https://aquaviina.md/ro",
        "x-default": "https://aquaviina.md/ro",
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: `https://aquaviina.md/${locale}`,
      siteName: "Aqua Viina",
      type: "website",
    },
    twitter: {
      title: current.title,
      description: current.description,
      card: "summary_large_image",
    },
  };
}

const Home = async ({ params }: { params: Promise<{ locale: "ru" | "ro" }> }) => {
  const { locale } = await params;
  // Разметка FAQ = видимые вопросы на главной (components/wf/content.ts)
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ[locale === "ro" ? "ro" : "ru"].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <HomePage />
    </>
  );
};

export default Home;
