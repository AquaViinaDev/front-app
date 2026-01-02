import { getProductById, resolveMediaUrl } from "@lib/api";
import { Metadata } from "next";
import ProductPageClient from "./ProductPageClient";
import { mapProductForLocale } from "./utils";

export type ProductPageTypeProps = {
  params: {
    id: string;
    locale: string;
  };
};

export async function generateMetadata({ params }: ProductPageTypeProps): Promise<Metadata> {
  const { id, locale } = await params;
  try {
    const product = await getProductById(id, locale);

    if (!product) {
      return {
        title: "Товар не найден",
        description: "Запрошенный фильтр не найден.",
      };
    }

    const localizedProduct = mapProductForLocale(product, locale);

    if (!localizedProduct?.name || typeof localizedProduct.name !== "string") {
      return {
        title: "Товар не найден",
        description: "Запрошенный фильтр не найден.",
      };
    }

  const isRo = locale === "ro";
  const title = isRo
    ? `${localizedProduct.name} — filtru de apă`
    : `${localizedProduct.name} — фильтр для воды`;
  let desc = String(localizedProduct.description ?? "").trim();
  if (desc.length > 140) {
    desc = desc.slice(0, 140);
    const lastSpace = desc.lastIndexOf(" ");
    if (lastSpace > 0) desc = desc.slice(0, lastSpace);
    desc += "...";
  }
  const hasDesc = desc.length > 0;
  const description = hasDesc
    ? isRo
      ? `Cumpără cu livrare în Chișinău ${localizedProduct.name}. ${desc}`
      : `Купить с доставкой в Кишинёве ${localizedProduct.name}. ${desc}`
    : isRo
      ? `Filtru de apă ${localizedProduct.name} cu livrare în Chișinău și Moldova.`
      : `Фильтр для воды ${localizedProduct.name} с доставкой по Кишинёву и Молдове.`;
  const mainImage = product.images?.[0];
  let resolvedImage: string | null = null;
  if (typeof mainImage === "string") {
    try {
      resolvedImage = resolveMediaUrl(mainImage);
    } catch {
      resolvedImage = null;
    }
  }

    return {
      title,
      description,
      alternates: {
        canonical: `https://aquaviina.md/${locale}/products/${id}`,
        languages: {
          ru: `https://aquaviina.md/ru/products/${id}`,
          ro: `https://aquaviina.md/ro/products/${id}`,
          "x-default": `https://aquaviina.md/ro/products/${id}`,
        },
      },
      openGraph: {
        title,
        description,
        url: `https://aquaviina.md/${locale}/products/${id}`,
        siteName: "AquaViina",
        type: "product",
        images: resolvedImage ? [resolvedImage] : undefined,
      },
      twitter: {
        title,
        description,
        card: "summary_large_image",
        images: resolvedImage ? [resolvedImage] : undefined,
      },
    };
  } catch (error) {
    console.error("Product metadata failed", { id, locale, error });
    return {
      title: "Товар не найден",
      description: "Запрошенный фильтр не найден.",
    };
  }
}

const ProductPage = async ({ params }: ProductPageTypeProps) => {
  const { id, locale } = await params;
  return <ProductPageClient id={id} locale={locale} />;
};

export default ProductPage;
