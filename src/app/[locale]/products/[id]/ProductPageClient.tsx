"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { PageLayout } from "@components/layout/PageLayout";
import Image from "next/image";
import { Button, CartAmount, CartIcon } from "@components/common";
import { resolveMediaUrl } from "@lib/api";
import { mapProductForLocale } from "./utils";
import styles from "./ProductPage.module.scss";
import { useOrder } from "@components/CartPage/CartContext";
import { useRouter } from "next/navigation";

type ProductPageClientProps = {
  id: string;
  locale: string;
  initialProduct: Record<string, unknown> | null;
};

const stringifyJsonLd = (value: unknown) =>
  JSON.stringify(value, (_key, val) => (typeof val === "bigint" ? val.toString() : val));

const normalizeCharacteristicKey = (key: string) =>
  key
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const isIdCharacteristicKey = (key: string) => {
  const normalized = normalizeCharacteristicKey(key);
  return normalized === "id" || normalized.startsWith("id ");
};

const isBrandCharacteristicKey = (key: string) => {
  const normalized = normalizeCharacteristicKey(key);
  return normalized.includes("бренд") || normalized.includes("brand");
};

const isTypeCharacteristicKey = (key: string) => {
  const normalized = normalizeCharacteristicKey(key);
  return (
    normalized.includes("тип товара") ||
    normalized.includes("tip produs") ||
    normalized.includes("type produs") ||
    normalized.includes("product type")
  );
};

const isCountryCharacteristicKey = (key: string) => {
  const normalized = normalizeCharacteristicKey(key);
  return (
    normalized.includes("страна производ") ||
    normalized.includes("tara de origine") ||
    normalized.includes("country of origin")
  );
};

const normalizePriceValue = (value: unknown) => {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric >= 0) {
    return numeric.toFixed(2);
  }

  if (typeof value === "string") {
    const cleaned = value.trim().replace(",", ".");
    const parsed = Number(cleaned);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed.toFixed(2);
    }
  }

  return "0.00";
};

const ProductPageClient = ({ id, locale, initialProduct }: ProductPageClientProps) => {
  const activeLocale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const [product, setProduct] = useState<Record<string, unknown> | null>(initialProduct ?? null);
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [cartAmount, setCartAmount] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "reviews">("specs");
  const [showCounter, setShowCounter] = useState(false);
  const { items, addProduct, updateProductQty, removeProduct } = useOrder();

  useEffect(() => {
    setActiveImageIndex(0);
    setProduct(initialProduct ?? null);
    setIsLoading(!initialProduct);
  }, [id, locale, initialProduct]);

  const { safeLocalizedProduct, productName, resolvedImage } = useMemo(() => {
    if (!product || typeof product !== "object") {
      return {
        safeLocalizedProduct: null,
        productName: "",
        resolvedImage: null as string | null,
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
    return {
      safeLocalizedProduct: merged,
      productName: name,
      resolvedImage: image,
    };
  }, [product, locale]);

  const shouldDisableOptimization = (src?: string | null) =>
    !!src && (!src.startsWith("/") || src.toLowerCase().includes(".heic"));

  const normalizedCharacteristics = useMemo(() => {
    if (!safeLocalizedProduct || typeof safeLocalizedProduct.characteristics !== "object") {
      return [];
    }
    return Object.entries(safeLocalizedProduct.characteristics as Record<string, unknown>)
      .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
      .map(([key, value]) => [key, (value as string).trim()] as [string, string]);
  }, [safeLocalizedProduct]);

  const descriptionText =
    typeof safeLocalizedProduct?.description === "string"
      ? safeLocalizedProduct.description
      : String(safeLocalizedProduct?.description ?? "");
  const brandText =
    typeof safeLocalizedProduct?.brand === "string"
      ? safeLocalizedProduct.brand
      : String(safeLocalizedProduct?.brand ?? "");
  const typeText =
    typeof safeLocalizedProduct?.type === "string"
      ? safeLocalizedProduct.type
      : String(safeLocalizedProduct?.type ?? "");
  const currentItem = items.find((i) => i.id === id);

  useEffect(() => {
    setShowCounter(Boolean(currentItem));
  }, [currentItem]);
  const characteristicCollator = useMemo(
    () => new Intl.Collator(activeLocale === "ro" ? "ro" : "ru"),
    [activeLocale]
  );

  const orderedCharacteristics = useMemo(() => {
    const entries = [...normalizedCharacteristics];
    const used = new Set<number>();

    const takeFirst = (
      predicate: (key: string) => boolean
    ): [string, string] | null => {
      const idx = entries.findIndex(([key], entryIndex) => {
        if (used.has(entryIndex)) return false;
        return predicate(key);
      });
      if (idx === -1) return null;
      used.add(idx);
      return entries[idx];
    };

    const result: [string, string][] = [];
    const idEntry = takeFirst(isIdCharacteristicKey);
    const brandEntry = takeFirst(isBrandCharacteristicKey);
    const typeEntry = takeFirst(isTypeCharacteristicKey);
    const countryEntry = takeFirst(isCountryCharacteristicKey);

    result.push(idEntry ?? ["Id", id]);

    if (brandEntry) {
      result.push(brandEntry);
    } else if (brandText.trim()) {
      result.push([locale === "ro" ? "Brand" : "Бренд", brandText.trim()]);
    }

    if (typeEntry) {
      result.push(typeEntry);
    } else if (typeText.trim()) {
      result.push([locale === "ro" ? "Tip produs" : "Тип товара", typeText.trim()]);
    }

    if (countryEntry) {
      result.push(countryEntry);
    }

    const alphabetic = entries
      .filter((_, index) => !used.has(index))
      .sort(([a], [b]) => characteristicCollator.compare(a, b));

    return [...result, ...alphabetic];
  }, [normalizedCharacteristics, brandText, typeText, id, locale, characteristicCollator]);

  const hasCharacteristics = orderedCharacteristics.length > 0;
  const skuKey = locale === "ro" ? "Cod produs (SKU)" : "Артикул (SKU)";
  const skuEntry = normalizedCharacteristics.find(([key]) => key === skuKey);
  const sku = skuEntry ? skuEntry[1] : undefined;

  const brandLabel = t("ProductPage.brandLabel");
  const skuLabel = t("ProductPage.skuLabel");
  const inStock = Boolean(safeLocalizedProduct?.inStock);
  const price = Number(safeLocalizedProduct?.price ?? 0);
  const parsedOldPrice = Number(safeLocalizedProduct?.oldPrice);
  const hasDiscountPrice = Number.isFinite(parsedOldPrice) && parsedOldPrice > price;
  const oldPrice = hasDiscountPrice ? parsedOldPrice : undefined;
  const discount = oldPrice ? Math.max(oldPrice - price, 0) : undefined;

  const handleAddToCart = () => {
    addProduct(id, cartAmount);
    setShowCounter(true);
  };

  const handleBuyNow = () => {
    if (!currentItem) {
      addProduct(id, cartAmount);
    }

    router.push(`/${locale}/cart`);
  };

  const handleProductAmountChange = (value: number) => {
    if (value <= 0) {
      if (currentItem) {
        removeProduct(id);
      }
      setCartAmount(1);
      setShowCounter(false);
      return;
    }

    if (currentItem) {
      updateProductQty(id, value);
      return;
    }

    setCartAmount(value);
  };

  const imageSources = useMemo(() => {
    const list = Array.isArray(safeLocalizedProduct?.images)
      ? safeLocalizedProduct.images
      : [];
    if (!list.length && resolvedImage) {
      return [resolvedImage];
    }
    return list
      .map((img: unknown) => (typeof img === "string" ? img : null))
      .filter((img): img is string => typeof img === "string" && img.trim().length > 0);
  }, [safeLocalizedProduct?.images, resolvedImage]);

  const resolvedImages = useMemo(
    () =>
      imageSources
        .map((img) => {
          try {
            return resolveMediaUrl(img);
          } catch {
            return img;
          }
        })
        .filter((img: unknown): img is string => typeof img === "string" && img.trim().length > 0),
    [imageSources]
  );

  const activeImage = resolvedImages[activeImageIndex] ?? resolvedImage ?? "/images/placeholder.svg";
  const rating = null;
  const reviewsCount = null;
  const hitLabel = t("ProductPage.hitLabel");
  const discountLabel =
    discount && oldPrice && oldPrice > 0
      ? `-${Math.round((discount / oldPrice) * 100)}%`
      : null;

  const shortDescription =
    descriptionText.length > 220 ? `${descriptionText.slice(0, 220).trim()}...` : descriptionText;

  const benefitItems = orderedCharacteristics.slice(0, 4).map(([key, value]) =>
    `${key}: ${value}`
  );

  const mockReviews = [
    {
      name: t("ProductPage.mockReviews.0.name"),
      date: t("ProductPage.mockReviews.0.date"),
      rating: 5,
      text: t("ProductPage.mockReviews.0.text"),
    },
    {
      name: t("ProductPage.mockReviews.1.name"),
      date: t("ProductPage.mockReviews.1.date"),
      rating: 4,
      text: t("ProductPage.mockReviews.1.text"),
    },
    {
      name: t("ProductPage.mockReviews.2.name"),
      date: t("ProductPage.mockReviews.2.date"),
      rating: 5,
      text: t("ProductPage.mockReviews.2.text"),
    },
  ];

  const deliveryHighlights =
    locale === "ro"
      ? [
          "Livrare în Chișinău și în toată Moldova",
          "Până la 500 lei în Chișinău: 80 lei, peste: gratuit",
          "Până la 1000 lei în țară: 100 lei, peste: gratuit",
        ]
      : [
          "Доставка по Кишинёву и по всей Молдове",
          "До 500 лей по Кишинёву: 80 лей, выше: бесплатно",
          "До 1000 лей по стране: 100 лей, выше: бесплатно",
        ];

  const faqItems =
    locale === "ro"
      ? [
          {
            question: `Este potrivit ${productName || "acest filtru"} pentru apă dură?`,
            answer:
              "Da, avem configurații pentru reducerea depunerilor și îmbunătățirea gustului apei.",
          },
          {
            question: "Cât de des se schimbă cartușele?",
            answer:
              "Intervalul standard este 3-6 luni, în funcție de consum și calitatea apei la intrare.",
          },
          {
            question: "Se poate comanda instalare?",
            answer:
              "Da, oferim montaj și service periodic pentru filtrele cumpărate din AquaViina.",
          },
        ]
      : [
          {
            question: `Подходит ли ${productName || "этот фильтр"} для жесткой воды?`,
            answer:
              "Да, есть конфигурации для снижения накипи и улучшения вкуса воды.",
          },
          {
            question: "Как часто менять картриджи?",
            answer:
              "Стандартный интервал 3-6 месяцев, в зависимости от расхода и качества исходной воды.",
          },
          {
            question: "Можно заказать установку?",
            answer:
              "Да, у нас есть установка и регулярное сервисное обслуживание фильтров AquaViina.",
          },
        ];

  const normalizeBulletList = (value: string) => {
    const cleaned = value.replace(/^✅\\s*/g, "").trim();
    if (!cleaned.includes("•")) return null;
    return cleaned
      .split("•")
      .map((part) => part.trim())
      .filter(Boolean);
  };

  const isPackageKey = (key: string) => {
    const lower = key.toLowerCase();
    return (
      lower.includes("комплектац") ||
      lower.includes("pachet complet") ||
      lower.includes("pachet") ||
      lower.includes("package")
    );
  };

  useEffect(() => {
    if (!hasCharacteristics && descriptionText.trim().length > 0) {
      setActiveTab("description");
    } else if (!hasCharacteristics && descriptionText.trim().length === 0 && reviewsCount !== null) {
      setActiveTab("reviews");
    }
  }, [hasCharacteristics, descriptionText, reviewsCount]);

  useEffect(() => {
    setShowCounter(Boolean(currentItem));
  }, [currentItem]);

  const canonicalProductUrl = `https://aquaviina.md/${locale}/products/${safeLocalizedProduct?.id ?? id}`;
  const additionalProperties = orderedCharacteristics
    .filter(([name, value]) => name.trim().length > 0 && value.trim().length > 0)
    .slice(0, 30)
    .map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    }));
  const schemaPrice = normalizePriceValue(safeLocalizedProduct?.price);
  const priceValidUntil = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 180
  ).toISOString().slice(0, 10);

  const productSchema = safeLocalizedProduct && productName ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: descriptionText || shortDescription,
    image: resolvedImages.length > 0 ? resolvedImages : resolvedImage ? [resolvedImage] : undefined,
    brand: brandText ? { "@type": "Brand", name: brandText } : undefined,
    sku,
    additionalProperty: additionalProperties.length > 0 ? additionalProperties : undefined,
    offers: {
      "@type": "Offer",
      url: canonicalProductUrl,
      priceCurrency: "MDL",
      price: schemaPrice,
      priceValidUntil,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "AquaViina",
        url: "https://aquaviina.md",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MD",
        },
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "100.00",
          currency: "MDL",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "MD",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  } : null;

  const breadcrumbSchema = productName ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("Common.breadcrumbHome"),
        item: `https://aquaviina.md/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("Common.catalogLabel"),
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

  const faqSchema = productName ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  if (!isLoading && (!safeLocalizedProduct || !productName)) {
    return (
      <PageLayout
        className={styles.pageLayout}
        contentClassName={styles.content}
        title={t("ProductPage.notFoundTitle")}
        showArrowBack={true}
      >
        <div style={{ padding: "16px 0" }}>
          {t("ProductPage.notFoundDescription")}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      className={styles.pageLayout}
      wrapperClassName={styles.pageWrapper}
      contentClassName={styles.content}
      showArrowBack={false}
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifyJsonLd(faqSchema),
          }}
        />
      )}
      {safeLocalizedProduct && (
        <>
          <div className={styles.topBar}>
            <div className={styles.topBarInner}>
              <button className={styles.backButton} onClick={() => router.push(`/${locale}/products`)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.backIcon}
                  aria-hidden="true"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                {t("ProductPage.backToCatalog")}
              </button>
            </div>
          </div>
          <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gallery}>
              <div className={styles.imageCard}>
                <Image
                  src={activeImage}
                  alt={productName}
                  className={styles.image}
                  width={560}
                  height={560}
                  priority
                  sizes="(max-width: 980px) 100vw, 50vw"
                  unoptimized={shouldDisableOptimization(activeImage)}
                />
                <span className={styles.badgePrimary}>{hitLabel}</span>
                {discountLabel && <span className={styles.badgeDiscount}>{discountLabel}</span>}
                {/* <button className={styles.favoriteButton} type="button" aria-label="Favorite">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.heartIcon}
                    aria-hidden="true"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                  </svg>
                </button> */}
                {resolvedImages.length > 1 && (
                  <>
                    <button
                      className={styles.navButton}
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? resolvedImages.length - 1 : prev - 1
                        )
                      }
                    >
                      ‹
                    </button>
                    <button
                      className={styles.navButtonRight}
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === resolvedImages.length - 1 ? 0 : prev + 1
                        )
                      }
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              {resolvedImages.length > 1 && (
                <div className={styles.thumbs}>
                  {resolvedImages.map((img, index: number) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      className={
                        index === activeImageIndex ? styles.thumbActive : styles.thumb
                      }
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={img}
                        alt=""
                        width={80}
                        height={80}
                        sizes="80px"
                        unoptimized={shouldDisableOptimization(img)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.details}>
              <div className={styles.detailsTop}>
                <div className={styles.metaRow}>
                  {typeText && <span className={styles.typeBadge}>{typeText}</span>}
                  {rating !== null && (
                    <div className={styles.rating}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={
                            idx < Math.round(rating)
                              ? styles.starFilled
                              : styles.starEmpty
                          }
                          aria-hidden="true"
                        >
                          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                        </svg>
                      ))}
                      <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
                    </div>
                  )}
                  {reviewsCount !== null && (
                    <span className={styles.reviewCount}>
                      {t("ProductPage.reviewsCountInline", { count: reviewsCount })}
                    </span>
                  )}
                </div>
                <h1 className={styles.title}>{productName}</h1>
                {(brandText || sku) && (
                  <div className={styles.metaInfo}>
                    {brandText && (
                      <span>
                        {brandLabel}: {brandText}
                      </span>
                    )}
                    {sku && (
                      <span>
                        {skuLabel}: {sku}
                      </span>
                    )}
                  </div>
                )}
                {shortDescription && <p className={styles.subtitle}>{shortDescription}</p>}
              </div>

              <div className={styles.priceRow}>
                <span className={styles.price}>{price} {t("ProductsPageInformation.price")}</span>
                {oldPrice && (
                  <span className={styles.oldPrice}>{oldPrice} {t("ProductsPageInformation.price")}</span>
                )}
                {discount && (
                  <span className={styles.discountBadge}>
                    {t("ProductPage.savings", {
                      amount: discount,
                      currency: t("ProductsPageInformation.price"),
                    })}
                  </span>
                )}
              </div>

              <div className={styles.deliveryBlock}>
                <h2 className={styles.deliveryTitle}>
                  {locale === "ro" ? "Livrare în Moldova" : "Доставка по Молдове"}
                </h2>
                <ul className={styles.deliveryList}>
                  {deliveryHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {benefitItems.length > 0 && (
                <div className={styles.benefits}>
                  <h3 className={styles.benefitsTitle}>
                    {t("ProductPage.benefitsTitle")}
                  </h3>
                  <ul className={styles.benefitsList}>
                    {benefitItems.map((item) => (
                      <li key={item} className={styles.benefitItem}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.checkIcon}
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.actionsRow}>
                <Button
                  disabled={!inStock}
                  buttonType="bigButton"
                  className={styles.buyNowButton}
                  onClick={handleBuyNow}
                >
                  {t("ProductsPageInformation.buyNowButton")}
                </Button>
                {showCounter ? (
                  <CartAmount
                    value={currentItem ? currentItem.qty : cartAmount}
                    size="compact"
                    minAmount={0}
                    className={styles.cartAmount}
                    onChange={handleProductAmountChange}
                  />
                ) : (
                  <Button
                    disabled={!inStock}
                    buttonType="bigButton"
                    className={styles.iconButton}
                    onClick={handleAddToCart}
                    aria-label={t("ProductsPageInformation.cartButton")}
                  >
                    <CartIcon className={styles.cartIcon} />
                  </Button>
                )}
                {/* <button className={styles.shareButton} type="button" aria-label="Share">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.shareIcon}
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button> */}
              </div>

              {/* <div className={styles.iconGrid}>
                <div>
                  <span className={styles.iconCircle}>🚚</span>
                  <p>{t("ProductPage.modalDeliveryInfo.title")}</p>
                </div>
                <div>
                  <span className={styles.iconCircle}>🛡️</span>
                  <p>{t("ProductPage.modalServiceInfo.title")}</p>
                </div>
                <div>
                  <span className={styles.iconCircle}>↩︎</span>
                  <p>{t("ProductPage.modalGuaranteeInfo.title")}</p>
                </div>
              </div> */}
            </div>
          </div>
          </div>
          <div className={styles.tabs} data-orientation="horizontal">
            <div className={styles.tabsList} role="tablist" aria-orientation="horizontal">
              {hasCharacteristics && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "specs"}
                  className={activeTab === "specs" ? styles.tabActive : styles.tab}
                  onClick={() => setActiveTab("specs")}
                >
                  {t("ProductPage.tabs.specs")}
                </button>
              )}
              {descriptionText.trim().length > 0 && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "description"}
                  className={activeTab === "description" ? styles.tabActive : styles.tab}
                  onClick={() => setActiveTab("description")}
                >
                  {t("ProductPage.tabs.description")}
                </button>
              )}
              {reviewsCount !== null && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "reviews"}
                  className={activeTab === "reviews" ? styles.tabActive : styles.tab}
                  onClick={() => setActiveTab("reviews")}
                >
                  {t("ProductPage.tabs.reviews", { count: reviewsCount })}
                </button>
              )}
            </div>
            {activeTab === "specs" && hasCharacteristics && (
              <div className={styles.tabPanel} role="tabpanel">
                <h2 className={styles.panelTitle}>
                  {t("ProductPage.tabs.specsTitle")}
                </h2>
                <div className={styles.specsGrid}>
                  {orderedCharacteristics.map(([key, value]) => {
                    const isPackage = isPackageKey(key);
                    const bullets = isPackage ? normalizeBulletList(value) : null;
                    return (
                      <div
                        className={isPackage ? styles.specRowWide : styles.specRow}
                        key={key}
                      >
                        <span>{key}</span>
                        {bullets ? (
                          <ul className={styles.packageList}>
                            {bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <span>{value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {activeTab === "description" && descriptionText.trim().length > 0 && (
              <div className={styles.tabPanel} role="tabpanel">
                <h2 className={styles.panelTitle}>
                  {t("ProductPage.tabs.descriptionTitle")}
                </h2>
                <p className={styles.descriptionText}>{descriptionText}</p>
              </div>
            )}
            {activeTab === "reviews" && reviewsCount !== null && (
              <div className={styles.tabPanel} role="tabpanel">
                <h2 className={styles.panelTitle}>
                  {t("ProductPage.tabs.reviewsTitle")}
                </h2>
                <div className={styles.reviewsList}>
                  {mockReviews.map((review) => (
                    <div key={`${review.name}-${review.date}`} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <div>
                          <p className={styles.reviewName}>{review.name}</p>
                          <p className={styles.reviewDate}>{review.date}</p>
                        </div>
                        <div className={styles.reviewStars}>
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <svg
                              key={idx}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={
                                idx < review.rating ? styles.starFilled : styles.starEmpty
                              }
                              aria-hidden="true"
                            >
                              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className={styles.reviewText}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <section className={styles.productFaqSection}>
            <h2 className={styles.productFaqTitle}>
              {locale === "ro" ? "Întrebări frecvente" : "Частые вопросы"}
            </h2>
            <div className={styles.productFaqList}>
              {faqItems.map((item) => (
                <details key={item.question} className={styles.productFaqItem}>
                  <summary className={styles.productFaqQuestion}>{item.question}</summary>
                  <p className={styles.productFaqAnswer}>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </>
      )}
    </PageLayout>
  );
};

export default ProductPageClient;
