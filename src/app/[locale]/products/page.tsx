export const dynamic = "force-dynamic";

import { ProductsListWrapper } from "@components/ProductsPage/components/ProductsListWrapper";
import { getProducts, getFilters } from "@lib/api";
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
}): Promise<Metadata> {
  const { locale } = await props.params;

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

  return {
    title: meta[locale].title,
    description: meta[locale].description,
    alternates: {
      canonical: `https://aqua-viina.md/${locale}/products`,
      languages: {
        ru: "https://aqua-viina.md/ru/products",
        ro: "https://aqua-viina.md/ro/products",
      },
    },
    openGraph: {
      title: meta[locale].title,
      description: meta[locale].description,
      url: `https://aqua-viina.md/${locale}/products`,
      siteName: "AquaViina",
      type: "website",
    },
  };
}

const Products = async (props: PageProps) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { locale } = params;

  const {
    brand,
    type,
    query,
    minPrice,
    maxPrice,
    sortOrder = "desc",
  } = searchParams;

  const filters = await getFilters(locale);

  const productsResponse = await getProducts({
    locale,
    brand,
    type,
    query,
    minPrice: minPrice ? Number(minPrice) : filters.price.low,
    maxPrice: maxPrice ? Number(maxPrice) : filters.price.more,
    sortOrder,
    page: 1,
    limit: 100,
  });

  return (
    <ProductsListWrapper
      locale={locale}
      initialFilters={filters}
      initialProducts={productsResponse.items}
      totalCount={productsResponse.total}
    />
  );
};

export default Products;
