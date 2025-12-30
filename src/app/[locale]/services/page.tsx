import { ServicesPage } from "@components/ServicesPage";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: "ru" | "ro" }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const titles = {
    ru: "Установка, замена картриджей и ремонт фильтров для воды — AquaViina",
    ro: "Montaj, înlocuire cartușe și reparații filtre de apă — AquaViina",
  };

  const descriptions = {
    ru: "Профессиональная установка фильтров, замена картриджей и ремонт систем очистки воды в Кишинёве и по всей Молдове. Бесплатная установка при покупке фильтра у нас. Гарантия на все работы — 6 месяцев.",
    ro: "Montaj profesional al filtrelor, înlocuirea cartușelor și reparații ale sistemelor de purificare a apei în Chișinău și în toată Moldova. Montaj gratuit pentru filtrele cumpărate de la noi. Garanție 6 luni pentru toate lucrările.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://aquaviina.md/${locale}/services`,
      languages: {
        ru: "https://aquaviina.md/ru/services",
        ro: "https://aquaviina.md/ro/services",
        "x-default": "https://aquaviina.md/ro/services",
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `https://aquaviina.md/${locale}/services`,
      siteName: "AquaViina",
      type: "website",
    },
    twitter: {
      title: titles[locale],
      description: descriptions[locale],
      card: "summary_large_image",
    },
  };
}

const Services = ({ params }: { params: { locale: "ru" | "ro" } }) => {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Сколько стоит установка фильтра?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Стоимость зависит от модели. При покупке фильтра у нас установка бесплатна.",
        },
      },
      {
        "@type": "Question",
        name: "Как часто менять картриджи?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Обычно каждые 3–6 месяцев, в зависимости от качества воды и нагрузки.",
        },
      },
      {
        "@type": "Question",
        name: "Вы обслуживаете фильтры других брендов?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, выполняем диагностику и ремонт систем очистки воды разных брендов.",
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
        name: "Cât costă instalarea filtrului?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Costul depinde de model. La achiziție, instalarea este gratuită.",
        },
      },
      {
        "@type": "Question",
        name: "Cât de des se schimbă cartușele?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "De obicei la 3–6 luni, în funcție de calitatea apei.",
        },
      },
      {
        "@type": "Question",
        name: "Reparați filtre de la alte branduri?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da, oferim diagnostic și reparații pentru diferite branduri.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://aquaviina.md/ru",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Услуги",
        item: "https://aquaviina.md/ru/services",
      },
    ],
  };

  const breadcrumbSchemaRo = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: "https://aquaviina.md/ro",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicii",
        item: "https://aquaviina.md/ro/services",
      },
    ],
  };

  const isRo = params.locale === "ro";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(isRo ? faqRo : faq),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(isRo ? breadcrumbSchemaRo : breadcrumbSchema),
        }}
      />
      <ServicesPage />
    </>
  );
};

export default Services;
