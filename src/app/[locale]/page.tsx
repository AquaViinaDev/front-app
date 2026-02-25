import { Metadata } from "next";
import { HomePage } from "@components/HomePage";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const meta = {
    ru: {
      title: "Фильтр для воды в Молдове — купить в AquaViina",
      description:
        "Купить фильтр для воды в Молдове: кувшины, проточные системы и обратный осмос. AquaViina, доставка по Кишинёву и всей Молдове, установка и сервис.",
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
      canonical: `https://aquaviina.md/${locale}`,
      languages: {
        ru: "https://aquaviina.md/ru",
        ro: "https://aquaviina.md/ro",
        "x-default": "https://aquaviina.md/ru",
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: `https://aquaviina.md/${locale}`,
      siteName: "AquaViina",
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
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Какие фильтры для воды вы продаете?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "В нашем каталоге есть кувшины, проточные фильтры, обратный осмос и сменные картриджи.",
        },
      },
      {
        "@type": "Question",
        name: "Есть ли доставка по Молдове?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, доставляем по Кишинёву и по всей Молдове.",
        },
      },
      {
        "@type": "Question",
        name: "Помогаете с установкой фильтров?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, выполняем установку и обслуживание фильтров для воды.",
        },
      },
    ],
  };

  const faqRo = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ce tipuri de filtre de apă vindeți?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "În catalog găsiți căni filtrante, filtre de debit, osmoză inversă și cartușe.",
        },
      },
      {
        "@type": "Question",
        name: "Livrați în toată Moldova?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da, livrăm în Chișinău și în toată Moldova.",
        },
      },
      {
        "@type": "Question",
        name: "Oferiți instalare pentru filtre?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da, oferim instalare și service pentru filtrele de apă.",
        },
      },
    ],
  };

  const { locale } = await params;
  const schema = locale === "ro" ? faqRo : faq;

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
