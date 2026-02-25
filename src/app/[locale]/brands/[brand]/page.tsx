import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
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

const findBrand = (filters: Awaited<ReturnType<typeof getFilters>>, raw: string) => {
  const decoded = decodeURIComponent(raw).toLowerCase();
  const slug = normalizeSlug(decoded);

  return (filters.brand || []).find((item) => {
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
  params: Promise<{ locale: "ru" | "ro"; brand: string }>;
}): Promise<Metadata> {
  const { locale, brand } = await props.params;
  const filters = await getFilters(locale);
  const match = findBrand(filters, brand);

  const displayName = match ? (locale === "ro" ? match.ro : match.ru) : decodeURIComponent(brand);
  const canonicalSlug = match
    ? normalizeSlug(match.ro || match.ru || decodeURIComponent(brand))
    : normalizeSlug(decodeURIComponent(brand));
  const canonicalBrand = canonicalSlug || normalizeSlug(brand) || brand.toLowerCase();
  const title =
    locale === "ro"
      ? `Filtre de apă ${displayName} — AquaViina`
      : `Фильтры для воды ${displayName} — AquaViina`;
  const description =
    locale === "ro"
      ? `Catalog de filtre de apă ${displayName} cu livrare în Moldova.`
      : `Каталог фильтров для воды ${displayName} с доставкой по Молдове.`;
  const canonical = `https://aquaviina.md/${locale}/brands/${canonicalBrand}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ru: `https://aquaviina.md/ru/brands/${canonicalBrand}`,
        ro: `https://aquaviina.md/ro/brands/${canonicalBrand}`,
        "x-default": `https://aquaviina.md/ru/brands/${canonicalBrand}`,
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

const BrandPage = async ({
  params,
}: {
  params: { locale: "ru" | "ro"; brand: string };
}) => {
  const filters = await getFilters(params.locale);
  const match = findBrand(filters, params.brand);

  if (!match) {
    notFound();
  }

  const canonicalBrand = normalizeSlug(match.ro || match.ru || params.brand);
  if (canonicalBrand && params.brand !== canonicalBrand) {
    permanentRedirect(`/${params.locale}/brands/${canonicalBrand}`);
  }

  const defaultBrand = match.ro;
  const basePathname = `/${params.locale}/brands/${params.brand}`;

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
        item: `https://aquaviina.md/${params.locale}/brands/${params.brand}`,
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
        defaultBrand={defaultBrand}
        basePathname={basePathname}
        resetPathname={`/${params.locale}/products`}
      />
    </>
  );
};

export default BrandPage;
