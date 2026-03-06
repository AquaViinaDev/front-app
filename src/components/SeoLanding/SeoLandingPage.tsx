import Link from "next/link";
import styles from "./SeoLandingPage.module.scss";

type Locale = "ru" | "ro";

type LandingIntent = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

type LandingFaq = {
  question: string;
  answer: string;
};

type LandingContent = {
  path: string;
  oppositePath: string;
  oppositeLabel: string;
  title: string;
  lead: string;
  catalogLabel: string;
  catalogHref: string;
  semanticTitle: string;
  semanticText: string;
  semanticChips: string[];
  intentsTitle: string;
  intents: LandingIntent[];
  categoriesTitle: string;
  categories: Array<{ label: string; href: string }>;
  brandsTitle: string;
  brands: Array<{ label: string; href: string }>;
  faqTitle: string;
  faq: LandingFaq[];
};

const landingContent: Record<Locale, LandingContent> = {
  ru: {
    path: "/ru/filtry-dlya-vody-v-moldove",
    oppositePath: "/ro/filtre-apa-moldova",
    oppositeLabel: "Versiunea în română",
    title: "Фильтр для воды в Молдове: подбор, доставка и установка",
    lead:
      "AquaViina помогает подобрать фильтр под качество воды, бюджет и задачу семьи. Доставка по Кишинёву и всей Молдове, консультация и сервисное обслуживание.",
    catalogLabel: "Перейти в каталог фильтров",
    catalogHref: "/ru/products",
    semanticTitle: "Семантика страницы (RU + MD)",
    semanticText:
      "Страница покрывает коммерческие и локальные запросы: фильтр для воды, купить фильтр в Молдове, обратный осмос, фильтр под мойку, доставка по Кишинёву.",
    semanticChips: [
      "фильтр для воды",
      "фильтр для воды в Молдове",
      "купить фильтр для воды Кишинёв",
      "обратный осмос в Молдове",
      "фильтр для жёсткой воды",
      "фильтр для воды для дома",
      "фильтр для воды из скважины",
    ],
    intentsTitle: "Подбор по задаче",
    intents: [
      {
        title: "Для дома",
        description: "Компактные и производительные решения для ежедневного питья и готовки.",
        href: "/ru/products?query=%D1%84%D0%B8%D0%BB%D1%8C%D1%82%D1%80%20%D0%B4%D0%BB%D1%8F%20%D0%B4%D0%BE%D0%BC%D0%B0",
        cta: "Подобрать для дома",
      },
      {
        title: "Для воды из скважины",
        description: "Системы для механической очистки, запахов и повышенной минерализации.",
        href: "/ru/products?query=%D1%84%D0%B8%D0%BB%D1%8C%D1%82%D1%80%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%BA%D0%B2%D0%B0%D0%B6%D0%B8%D0%BD%D1%8B",
        cta: "Подобрать для скважины",
      },
      {
        title: "Для жёсткой воды",
        description: "Решения против накипи и избытка солей жесткости для кухни и техники.",
        href: "/ru/products?query=%D1%84%D0%B8%D0%BB%D1%8C%D1%82%D1%80%20%D0%B4%D0%BB%D1%8F%20%D0%B6%D0%B5%D1%81%D1%82%D0%BA%D0%BE%D0%B9%20%D0%B2%D0%BE%D0%B4%D1%8B",
        cta: "Подобрать для жёсткой воды",
      },
      {
        title: "Обратный осмос",
        description: "Глубокая очистка до питьевого стандарта с мембранной технологией.",
        href: "/ru/types/osmoza-inversa",
        cta: "Смотреть осмос",
      },
    ],
    categoriesTitle: "Популярные категории",
    categories: [
      { label: "Обратные осмосы", href: "/ru/types/osmoza-inversa" },
      { label: "Проточные фильтры", href: "/ru/types/filtre-sub-chiuveta" },
      { label: "Предфильтры", href: "/ru/types/prefiltre" },
      { label: "Картриджи", href: "/ru/types/cartuse" },
    ],
    brandsTitle: "Бренды в наличии",
    brands: [
      { label: "AQUA VIINA", href: "/ru/brands/aqua-viina" },
      { label: "GREEN FILTER", href: "/ru/brands/green-filter" },
      { label: "GreenAqua", href: "/ru/brands/greenaqua" },
      { label: "FIL TEK", href: "/ru/brands/fil-tek" },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      {
        question: "Какой фильтр выбрать для квартиры в Кишинёве?",
        answer:
          "Обычно выбирают проточные системы или обратный осмос. Подбор зависит от анализа воды, расхода семьи и бюджета.",
      },
      {
        question: "Есть ли доставка по Молдове?",
        answer:
          "Да, доставляем по Кишинёву и по всей Молдове. Условия доставки зависят от суммы заказа и населённого пункта.",
      },
      {
        question: "Можно ли заказать установку и обслуживание?",
        answer:
          "Да, есть монтаж, замена картриджей и сервис. Для постоянных клиентов доступно регулярное обслуживание.",
      },
      {
        question: "Подходят ли фильтры для жёсткой воды?",
        answer:
          "Да, у нас есть решения для снижения накипи и смягчения воды, включая многоступенчатые системы.",
      },
    ],
  },
  ro: {
    path: "/ro/filtre-apa-moldova",
    oppositePath: "/ru/filtry-dlya-vody-v-moldove",
    oppositeLabel: "Версия на русском",
    title: "Filtru de apă în Moldova: alegere, livrare și instalare",
    lead:
      "AquaViina te ajută să alegi filtrul potrivit pentru calitatea apei și buget. Livrare în Chișinău și în toată Moldova, consultanță și service complet.",
    catalogLabel: "Vezi catalogul de filtre",
    catalogHref: "/ro/products",
    semanticTitle: "Semantică țintită (RO + MD)",
    semanticText:
      "Pagina acoperă interogări comerciale și locale: filtru de apă, filtre apă Moldova, osmoză inversă, filtru sub chiuvetă, livrare Chișinău.",
    semanticChips: [
      "filtru de apă",
      "filtre apă Moldova",
      "filtru apă Chișinău",
      "osmoză inversă Moldova",
      "filtru pentru apă dură",
      "filtru de apă pentru casă",
      "filtru pentru apă din fântână",
    ],
    intentsTitle: "Alegere după nevoie",
    intents: [
      {
        title: "Pentru casă",
        description: "Sisteme practice pentru consum zilnic, gătit și protecția aparatelor.",
        href: "/ro/products?query=filtru%20apa%20pentru%20casa",
        cta: "Alege pentru casă",
      },
      {
        title: "Pentru apă din fântână",
        description: "Filtrare mecanică și reducerea mirosurilor pentru surse individuale.",
        href: "/ro/products?query=filtru%20apa%20fantana",
        cta: "Alege pentru fântână",
      },
      {
        title: "Pentru apă dură",
        description: "Soluții împotriva depunerilor de calcar și excesului de săruri.",
        href: "/ro/products?query=filtru%20pentru%20apa%20dura",
        cta: "Alege pentru apă dură",
      },
      {
        title: "Osmoză inversă",
        description: "Purificare avansată pentru apă potabilă de calitate înaltă.",
        href: "/ro/types/osmoza-inversa",
        cta: "Vezi osmoză inversă",
      },
    ],
    categoriesTitle: "Categorii populare",
    categories: [
      { label: "Osmoză inversă", href: "/ro/types/osmoza-inversa" },
      { label: "Filtre sub chiuvetă", href: "/ro/types/filtre-sub-chiuveta" },
      { label: "Prefiltre", href: "/ro/types/prefiltre" },
      { label: "Cartușe", href: "/ro/types/cartuse" },
    ],
    brandsTitle: "Branduri disponibile",
    brands: [
      { label: "AQUA VIINA", href: "/ro/brands/aqua-viina" },
      { label: "GREEN FILTER", href: "/ro/brands/green-filter" },
      { label: "GreenAqua", href: "/ro/brands/greenaqua" },
      { label: "FIL TEK", href: "/ro/brands/fil-tek" },
    ],
    faqTitle: "Întrebări frecvente",
    faq: [
      {
        question: "Ce filtru să aleg pentru apartament în Chișinău?",
        answer:
          "De regulă se aleg filtre sub chiuvetă sau sisteme de osmoză inversă. Alegerea depinde de calitatea apei și consumul familiei.",
      },
      {
        question: "Livrați în toată Moldova?",
        answer:
          "Da, livrăm în Chișinău și în toate regiunile Moldovei. Costul depinde de localitate și valoarea comenzii.",
      },
      {
        question: "Oferiți instalare și service?",
        answer:
          "Da, oferim montaj, înlocuire cartușe și mentenanță periodică pentru sistemele achiziționate.",
      },
      {
        question: "Aveți soluții pentru apă dură?",
        answer:
          "Da, avem filtre pentru reducerea depunerilor și sisteme multi-etapă pentru apă dură.",
      },
    ],
  },
};

const stringifyJsonLd = (value: unknown) =>
  JSON.stringify(value, (_key, val) => (typeof val === "bigint" ? val.toString() : val));

type SeoLandingPageProps = {
  locale: Locale;
};

const SeoLandingPage = ({ locale }: SeoLandingPageProps) => {
  const content = landingContent[locale];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ro" ? "Acasă" : "Главная",
        item: `https://aquaviina.md/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "ro" ? "Catalog" : "Каталог",
        item: `https://aquaviina.md/${locale}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.title,
        item: `https://aquaviina.md${content.path}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: content.intents.map((intent, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: intent.title,
      url: `https://aquaviina.md${intent.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(itemListSchema) }}
      />

      <article className={styles.root}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.lead}>{content.lead}</p>
          <div className={styles.ctaRow}>
            <Link href={content.catalogHref} className={styles.ctaPrimary}>
              {content.catalogLabel}
            </Link>
            <Link href={content.oppositePath} className={styles.ctaSecondary}>
              {content.oppositeLabel}
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.semanticTitle}</h2>
          <p className={styles.sectionText}>{content.semanticText}</p>
          <ul className={styles.chips}>
            {content.semanticChips.map((chip) => (
              <li key={chip} className={styles.chip}>
                {chip}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.intentsTitle}</h2>
          <div className={styles.grid}>
            {content.intents.map((intent) => (
              <article key={intent.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{intent.title}</h3>
                <p className={styles.cardText}>{intent.description}</p>
                <Link href={intent.href} className={styles.cardLink}>
                  {intent.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.categoriesTitle}</h2>
          <ul className={styles.list}>
            {content.categories.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.brandsTitle}</h2>
          <ul className={styles.list}>
            {content.brands.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.faqTitle}</h2>
          <div className={styles.faq}>
            {content.faq.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  );
};

export default SeoLandingPage;
