import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFilters } from "@lib/api";
import ProductsListWrapper from "@components/ProductsPage/components/ProductsListWrapper";

const normalizeSlug = (value: string) => {
  const trimmed = value.trim().toLowerCase();
  const normalized = trimmed
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s")
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t");
  return normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
};

const findType = (filters: Awaited<ReturnType<typeof getFilters>>, raw: string) => {
  const decoded = decodeURIComponent(raw).toLowerCase();
  const slug = normalizeSlug(decoded);

  return (filters.productType || []).find((item) => {
    const ro = item.ro?.toLowerCase() ?? "";
    const ru = item.ru?.toLowerCase() ?? "";
    return (
      normalizeSlug(ro) === slug ||
      normalizeSlug(ru) === slug ||
      ro === decoded ||
      ru === decoded
    );
  });
};

export async function generateMetadata(props: {
  params: Promise<{ locale: "ru" | "ro"; type: string }>;
}): Promise<Metadata> {
  const { locale, type } = await props.params;
  const filters = await getFilters(locale);
  const match = findType(filters, type);

  const displayName = match ? (locale === "ro" ? match.ro : match.ru) : decodeURIComponent(type);
  const title =
    locale === "ro"
      ? `Filtre de apă ${displayName} — AquaViina`
      : `Фильтры для воды ${displayName} — AquaViina`;
  const description =
    locale === "ro"
      ? `Catalog de filtre de apă ${displayName} cu livrare în Moldova.`
      : `Каталог фильтров для воды ${displayName} с доставкой по Молдове.`;
  const canonical = `https://aquaviina.md/${locale}/types/${type}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ru: `https://aquaviina.md/ru/types/${type}`,
        ro: `https://aquaviina.md/ro/types/${type}`,
        "x-default": `https://aquaviina.md/ro/types/${type}`,
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

const TypePage = async ({
  params,
}: {
  params: { locale: "ru" | "ro"; type: string };
}) => {
  const filters = await getFilters(params.locale);
  const match = findType(filters, params.type);

  if (!match) {
    notFound();
  }

  const defaultType = match.ro;
  const basePathname = `/${params.locale}/types/${params.type}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: params.locale === "ro" ? "Acasă" : "Главная",
        item: `https://aquaviina.md/${params.locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: params.locale === "ro" ? "Catalog" : "Каталог",
        item: `https://aquaviina.md/${params.locale}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: params.locale === "ro" ? match.ro : match.ru,
        item: `https://aquaviina.md/${params.locale}/types/${params.type}`,
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
      <ProductsListWrapper
        defaultType={defaultType}
        basePathname={basePathname}
        resetPathname={`/${params.locale}/products`}
      />
    </>
  );
};

export default TypePage;
