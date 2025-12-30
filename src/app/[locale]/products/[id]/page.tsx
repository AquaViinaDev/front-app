import { getProductById, resolveMediaUrl } from "@lib/api";
import { notFound } from "next/navigation";
import { PageLayout } from "@components/layout/PageLayout";
import Image from "next/image";
import { ProductInformationBlock } from "@components/ProductInformationBlock";
import { Metadata } from "next";
import { mapProductForLocale } from "./utils";

import styles from "./ProductPage.module.scss";

export type ProductPageTypeProps = {
  params: {
    id: string;
    locale: string;
  };
};

export async function generateMetadata({ params }: ProductPageTypeProps): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await getProductById(id, locale);

  if (!product) {
    return {
      title: "Товар не найден",
      description: "Запрошенный фильтр не найден.",
    };
  }

  const localizedProduct = mapProductForLocale(product, locale);

  if (!localizedProduct?.name) {
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
}

const ProductPage = async ({ params }: ProductPageTypeProps) => {
  const { id, locale } = await params;
  let product: Awaited<ReturnType<typeof getProductById>> = null;
  try {
    product = await getProductById(id, locale);
  } catch (err) {
    console.error("Failed to load product:", err);
  }

  if (!product) {
    notFound();
  }

  const localizedProduct = mapProductForLocale(product, locale);
  const safeLocalizedProduct = {
    ...product,
    ...localizedProduct,
  };

  if (!safeLocalizedProduct?.name) {
    notFound();
  }

  const mainImage = product.images?.[0];
  let resolvedImage: string | null = null;
  if (typeof mainImage === "string") {
    try {
      resolvedImage = resolveMediaUrl(mainImage);
    } catch {
      resolvedImage = null;
    }
  }
  const shouldDisableOptimization =
    !!resolvedImage &&
    (!resolvedImage.startsWith("/") || resolvedImage.toLowerCase().includes(".heic"));

  const rawCharacteristics = safeLocalizedProduct.characteristics;
  const normalizedCharacteristics =
    rawCharacteristics && typeof rawCharacteristics === "object"
      ? Object.entries(rawCharacteristics as Record<string, unknown>)
          .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
          .map(([key, value]) => [key, (value as string).trim()] as [string, string])
      : [];
  const hasCharacteristics = normalizedCharacteristics.length > 0;

  const skuKey = locale === "ro" ? "Cod produs (SKU)" : "Артикул (SKU)";
  const skuEntry = normalizedCharacteristics.find(([key]) => key === skuKey);
  const sku = skuEntry ? skuEntry[1] : undefined;
  const descriptionText =
    typeof safeLocalizedProduct.description === "string"
      ? safeLocalizedProduct.description
      : String(safeLocalizedProduct.description ?? "");
  const brandText =
    typeof safeLocalizedProduct.brand === "string"
      ? safeLocalizedProduct.brand
      : String(safeLocalizedProduct.brand ?? "");

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: safeLocalizedProduct.name,
    description: descriptionText,
    image: resolvedImage ? [resolvedImage] : undefined,
    brand: brandText
      ? { "@type": "Brand", name: brandText }
      : undefined,
    sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "MDL",
      price: safeLocalizedProduct.price,
      availability: safeLocalizedProduct.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://aquaviina.md/${locale}/products/${safeLocalizedProduct.id}`,
    },
  };

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
        name: safeLocalizedProduct.name,
        item: `https://aquaviina.md/${locale}/products/${safeLocalizedProduct.id}`,
      },
    ],
  };
  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.content}
      title={safeLocalizedProduct.name}
      showArrowBack={true}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={resolvedImage ?? "/images/placeholder.svg"}
            alt={safeLocalizedProduct.name}
            className={styles.image}
            width={400}
            height={400}
            unoptimized={shouldDisableOptimization}
          />
        </div>
        <ProductInformationBlock
          productId={safeLocalizedProduct.id}
          price={safeLocalizedProduct.price}
          inStock={safeLocalizedProduct.inStock}
          oldPrice={safeLocalizedProduct.oldPrice}
        />
      </div>
      <div className={styles.additionalInfoBlock}>
       
        {typeof safeLocalizedProduct.description === "string" &&
          safeLocalizedProduct.description.trim().length > 0 && (
          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>
              {locale === "ru" ? "Описание:" : "Descriere:"}
            </h3>
            <div className={styles.descriptionInformation}>
              {safeLocalizedProduct.description.trim()}
            </div>
          </div>
        )}
         {hasCharacteristics && (
          <div className={styles.characteristics}>
            <h3 className={styles.characteristicsTitle}>
              {locale === "ru" ? "Технические характеристики:" : "Specificații tehnice:"}
            </h3>
            <ul className={styles.characteristicsInformation}>
              {normalizedCharacteristics.map(([key, value]) => (
                <li className={styles.characteristicsItem} key={key}>
                  <span className={styles.key}>{key}</span>
                  <span className={styles.value}>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductPage;
