export const dynamic = "force-dynamic";

import { ProductsListWrapper } from "@components/ProductsPage/components/ProductsListWrapper";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: "ru" | "ro" }>;
  searchParams: Promise<{
    brand?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    query?: string;
    sortOrder?: "asc" | "desc";
  }>;
};

export async function generateMetadata(props: {
  params: Promise<{ locale: "ru" | "ro" }>;
  searchParams?: Promise<{ brand?: string; type?: string; query?: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const searchParams = (await props.searchParams) ?? {};

  const meta = {
    ru: {
      title: "Каталог фильтров для воды — AquaViina",
      description:
        "Обзор всех фильтров для воды: кувшины, картриджи, обратный осмос. Сравнение, наличие и доставка по Молдове.",
    },
    ro: {
      title: "Catalog filtre de apă — AquaViina",
      description:
        "Prezentare generală a filtrelor de apă: căni, cartușe, osmoză inversă. Comparare, disponibilitate și livrare în Moldova.",
    },
  };

  const brandOrType = [searchParams.brand, searchParams.type]
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .join(" ");
  const querySuffix =
    typeof searchParams.query === "string" && searchParams.query.trim().length > 0
      ? searchParams.query.trim()
      : null;

  const localizedTitle = brandOrType
    ? locale === "ro"
      ? `Filtre de apă ${brandOrType} — AquaViina`
      : `Фильтры для воды ${brandOrType} — AquaViina`
    : meta[locale].title;
  const localizedDescription = querySuffix
    ? locale === "ro"
      ? `Căutare: ${querySuffix}. ${meta[locale].description}`
      : `Поиск: ${querySuffix}. ${meta[locale].description}`
    : meta[locale].description;

  return {
    title: localizedTitle,
    description: localizedDescription,
    alternates: {
      canonical: `https://aquaviina.md/${locale}/products`,
      languages: {
        ru: "https://aquaviina.md/ru/products",
        ro: "https://aquaviina.md/ro/products",
        "x-default": "https://aquaviina.md/ro/products",
      },
    },
    openGraph: {
      title: localizedTitle,
      description: localizedDescription,
      url: `https://aquaviina.md/${locale}/products`,
      siteName: "AquaViina",
      type: "website",
    },
    twitter: {
      title: localizedTitle,
      description: localizedDescription,
      card: "summary_large_image",
    },
  };
}

const Products = async (props: PageProps) => {
  const params = await props.params;

  const { locale } = params;

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ProductsListWrapper />
    </>
  );
};

export default Products;
