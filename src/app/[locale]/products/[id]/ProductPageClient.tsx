"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "use-intl";
import { PageLayout } from "@components/layout/PageLayout";
import Image from "next/image";
import { ProductInformationBlock } from "@components/ProductInformationBlock";
import { getProductById, resolveMediaUrl } from "@lib/api";
import { mapProductForLocale } from "./utils";
import styles from "./ProductPage.module.scss";

type ProductPageClientProps = {
  id: string;
  locale: string;
};

const stringifyJsonLd = (value: unknown) =>
  JSON.stringify(value, (_key, val) => (typeof val === "bigint" ? val.toString() : val));

const ProductPageClient = ({ id, locale }: ProductPageClientProps) => {
  const activeLocale = useLocale();
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    getProductById(id, locale)
      .then((data) => {
        if (isActive) {
          setProduct(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        if (isActive) {
          setProduct(null);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [id, locale]);

  const { safeLocalizedProduct, productName, resolvedImage, shouldDisableOptimization } = useMemo(() => {
    if (!product || typeof product !== "object") {
      return {
        safeLocalizedProduct: null,
        productName: "",
        resolvedImage: null as string | null,
        shouldDisableOptimization: false,
      };
    }

    const localizedProduct = mapProductForLocale(product, locale);
    const merged = {
      ...product,
      ...localizedProduct,
    };

    const name = typeof merged.name === "string" ? merged.name : "";
    const mainImage = product.images?.[0];
    let image: string | null = null;
    if (typeof mainImage === "string") {
      try {
        image = resolveMediaUrl(mainImage);
      } catch {
        image = null;
      }
    }
    const disableOptimization =
      !!image && (!image.startsWith("/") || image.toLowerCase().includes(".heic"));

    return {
      safeLocalizedProduct: merged,
      productName: name,
      resolvedImage: image,
      shouldDisableOptimization: disableOptimization,
    };
  }, [product, locale]);

  const normalizedCharacteristics = useMemo(() => {
    if (!safeLocalizedProduct || typeof safeLocalizedProduct.characteristics !== "object") {
      return [];
    }
    return Object.entries(safeLocalizedProduct.characteristics as Record<string, unknown>)
      .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
      .map(([key, value]) => [key, (value as string).trim()] as [string, string]);
  }, [safeLocalizedProduct]);

  const hasCharacteristics = normalizedCharacteristics.length > 0;
  const skuKey = locale === "ro" ? "Cod produs (SKU)" : "Артикул (SKU)";
  const skuEntry = normalizedCharacteristics.find(([key]) => key === skuKey);
  const sku = skuEntry ? skuEntry[1] : undefined;

  const descriptionText =
    typeof safeLocalizedProduct?.description === "string"
      ? safeLocalizedProduct.description
      : String(safeLocalizedProduct?.description ?? "");
  const brandText =
    typeof safeLocalizedProduct?.brand === "string"
      ? safeLocalizedProduct.brand
      : String(safeLocalizedProduct?.brand ?? "");

  const productSchema = safeLocalizedProduct && productName ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: descriptionText,
    image: resolvedImage ? [resolvedImage] : undefined,
    brand: brandText ? { "@type": "Brand", name: brandText } : undefined,
    sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "MDL",
      price:
        typeof safeLocalizedProduct.price === "number" ||
        typeof safeLocalizedProduct.price === "string"
          ? safeLocalizedProduct.price
          : String(safeLocalizedProduct.price ?? ""),
      availability: safeLocalizedProduct.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://aquaviina.md/${locale}/products/${safeLocalizedProduct.id}`,
    },
  } : null;

  const breadcrumbSchema = productName ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ro" ? "Acasa" : "Главная",
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
        name: productName,
        item: `https://aquaviina.md/${locale}/products/${safeLocalizedProduct?.id ?? id}`,
      },
    ],
  } : null;

  if (!isLoading && (!safeLocalizedProduct || !productName)) {
    return (
      <PageLayout
        className={styles.pageLayout}
        contentClassName={styles.content}
        title={locale === "ro" ? "Produsul nu a fost gasit" : "Товар не найден"}
        showArrowBack={true}
      >
        <div style={{ padding: "16px 0" }}>
          {locale === "ro"
            ? "Produsul solicitat nu a fost gasit."
            : "Запрошенный товар не найден."}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.content}
      title={productName}
      showArrowBack={true}
      isLoading={isLoading}
    >
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifyJsonLd(productSchema),
          }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifyJsonLd(breadcrumbSchema),
          }}
        />
      )}
      {safeLocalizedProduct && (
        <>
          <div className={styles.contentWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src={resolvedImage ?? "/images/placeholder.svg"}
                alt={productName}
                className={styles.image}
                width={400}
                height={400}
                unoptimized={shouldDisableOptimization}
              />
            </div>
            <ProductInformationBlock
              productId={safeLocalizedProduct.id}
              price={Number(safeLocalizedProduct.price ?? 0)}
              inStock={Boolean(safeLocalizedProduct.inStock)}
              oldPrice={
                safeLocalizedProduct.oldPrice !== undefined && safeLocalizedProduct.oldPrice !== null
                  ? Number(safeLocalizedProduct.oldPrice)
                  : undefined
              }
            />
          </div>
          <div className={styles.additionalInfoBlock}>
            {typeof safeLocalizedProduct.description === "string" &&
              safeLocalizedProduct.description.trim().length > 0 && (
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>
                    {activeLocale === "ru" ? "Описание:" : "Descriere:"}
                  </h3>
                  <div className={styles.descriptionInformation}>
                    {safeLocalizedProduct.description.trim()}
                  </div>
                </div>
              )}
            {hasCharacteristics && (
              <div className={styles.characteristics}>
                <h3 className={styles.characteristicsTitle}>
                  {activeLocale === "ru"
                    ? "Технические характеристики:"
                    : "Specificatii tehnice:"}
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
        </>
      )}
    </PageLayout>
  );
};

export default ProductPageClient;
