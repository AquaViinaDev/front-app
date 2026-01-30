"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { PageLayout } from "@components/layout/PageLayout";
import Image from "next/image";
import { Button, CartAmount } from "@components/common";
import { getProductById, resolveMediaUrl } from "@lib/api";
import { mapProductForLocale } from "./utils";
import styles from "./ProductPage.module.scss";
import { useOrder } from "@components/CartPage/CartContext";
import { useRouter } from "next/navigation";

type ProductPageClientProps = {
  id: string;
  locale: string;
};

const stringifyJsonLd = (value: unknown) =>
  JSON.stringify(value, (_key, val) => (typeof val === "bigint" ? val.toString() : val));

const ProductPageClient = ({ id, locale }: ProductPageClientProps) => {
  const activeLocale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [cartAmount, setCartAmount] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "reviews">("specs");
  const [showCounter, setShowCounter] = useState(false);
  const { items, addProduct, updateProductQty } = useOrder();

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

  const hasCharacteristics = normalizedCharacteristics.length > 0;
  const skuKey = locale === "ro" ? "Cod produs (SKU)" : "Артикул (SKU)";
  const skuEntry = normalizedCharacteristics.find(([key]) => key === skuKey);
  const sku = skuEntry ? skuEntry[1] : undefined;
  const currentItem = items.find((i) => i.id === id);

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

  const brandLabel = t("ProductPage.brandLabel");
  const skuLabel = t("ProductPage.skuLabel");
  const inStock = Boolean(safeLocalizedProduct?.inStock);
  const oldPrice =
    safeLocalizedProduct?.oldPrice !== undefined && safeLocalizedProduct?.oldPrice !== null
      ? Number(safeLocalizedProduct.oldPrice)
      : undefined;
  const price = Number(safeLocalizedProduct?.price ?? 0);
  const discount =
    oldPrice && oldPrice > price ? Math.max(oldPrice - price, 0) : undefined;

  const imageSources = useMemo(() => {
    const list = Array.isArray(safeLocalizedProduct?.images)
      ? safeLocalizedProduct.images
      : [];
    if (!list.length && resolvedImage) {
      return [resolvedImage];
    }
    return list
      .map((img: unknown) => (typeof img === "string" ? img : null))
      .filter((img: any): img is string => Boolean(img));
  }, [safeLocalizedProduct?.images, resolvedImage]);

  const resolvedImages = useMemo(
    () =>
      imageSources.map((img: any) => {
        try {
          return resolveMediaUrl(img);
        } catch {
          return img;
        }
      }),
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

  const benefitItems = normalizedCharacteristics.slice(0, 4).map(([key, value]) =>
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

  const orderedCharacteristics = useMemo(() => {
    if (!normalizedCharacteristics.length) return [];
    const items = [...normalizedCharacteristics];
    const packageItems = items.filter(([key]) => isPackageKey(key));
    const otherItems = items.filter(([key]) => !isPackageKey(key));
    return [...otherItems, ...packageItems];
  }, [normalizedCharacteristics]);

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
                  {resolvedImages.map((img: any, index: number) => (
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
                {showCounter ? (
                  <CartAmount
                    value={currentItem ? currentItem.qty : cartAmount}
                    size="compact"
                    className={styles.cartAmount}
                    onChange={(value) => {
                      if (currentItem) {
                        updateProductQty(id, value);
                      } else {
                        setCartAmount(value);
                      }
                    }}
                  />
                ) : (
                  <Button
                    disabled={!inStock}
                    buttonType="bigButton"
                    onClick={() => {
                      addProduct(id, cartAmount);
                      setShowCounter(true);
                    }}
                  >
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
                      className={styles.cartIcon}
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    {t("ProductsPageInformation.cartButton")}
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
        </>
      )}
    </PageLayout>
  );
};

export default ProductPageClient;
