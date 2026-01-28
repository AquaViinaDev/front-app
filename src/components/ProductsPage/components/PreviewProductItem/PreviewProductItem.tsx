import { HTMLAttributes, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "use-intl";
import { useOrder } from "@components/CartPage/CartContext";
import classNames from "classnames";
import { toast } from "react-toastify";
import { resolveMediaUrl } from "@lib/api";

import styles from "./PreviewProductItem.module.scss";

export type PreviewProductItemTypeProps = HTMLAttributes<HTMLLIElement> & {
  id: string;
  image: string;
  title: string;
  description?: string;
  typeLabel?: string;
  isInStock?: boolean;
  price?: number | string;
  oldPrice?: number | string | null;
  link: string;
};

const PreviewProductItem = memo(
  ({
    id,
    title,
    link,
    price,
    oldPrice,
    image,
    isInStock,
    description,
    typeLabel,
    ...props
  }: PreviewProductItemTypeProps) => {
    const locale = useLocale();
    const t = useTranslations();
    const { addProduct } = useOrder();
    const resolvedImage = image ? resolveMediaUrl(image) : null;
    const shouldDisableOptimization =
      !!resolvedImage &&
      (!resolvedImage.startsWith("/") || resolvedImage.toLowerCase().includes(".heic"));

    const handleAddToCart = () => {
      addProduct(id);
      toast.success(t("ProductsPageInformation.productAddedSuccess"));
    };

    const numericPrice = price !== undefined ? Number(price) : NaN;
    const numericOldPrice = oldPrice !== undefined && oldPrice !== null ? Number(oldPrice) : NaN;
    const hasDiscount =
      Number.isFinite(numericOldPrice) &&
      Number.isFinite(numericPrice) &&
      numericOldPrice > 0 &&
      numericOldPrice > numericPrice;
    const discountPercent = hasDiscount
      ? Math.round(((numericOldPrice - numericPrice) / numericOldPrice) * 100)
      : null;

    return (
      <li className={styles.root} {...props}>
        <div className={styles.media}>
          <Link
            className={styles.mediaLink}
            href={`/${locale}${link.startsWith("/") ? link : `/${link}`}`}
          >
            <Image
              src={resolvedImage ?? "/images/placeholder.svg"}
              alt={title}
              width={320}
              height={240}
              className={styles.itemImage}
              unoptimized={shouldDisableOptimization}
            />
          </Link>
          {hasDiscount && discountPercent !== null ? (
            <span className={classNames(styles.badge, styles.badgeSale)}>
              -{discountPercent}%
            </span>
          ) : (
            <span className={styles.badge}>
              {isInStock
                ? t("ProductsPageInformation.isInStock")
                : t("ProductsPageInformation.isn'tInStock")}
            </span>
          )}
        </div>
        <div className={styles.body}>
          <Link className={styles.titleLink} href={`/${locale}${link.startsWith("/") ? link : `/${link}`}`}>
            <h3 className={styles.title} title={title}>
              {title}
            </h3>
          </Link>
          {description ? <p className={styles.description}>{description}</p> : null}
          <div className={styles.meta}>
            {typeLabel ? <span className={styles.typeBadge}>{typeLabel}</span> : null}
            <span
              className={classNames(styles.stockInfo, {
                [styles.inStock]: isInStock,
                [styles.noStock]: !isInStock,
              })}
            >
              {isInStock
                ? t("ProductsPageInformation.isInStock")
                : t("ProductsPageInformation.isn'tInStock")}
            </span>
          </div>
          <div className={styles.footer}>
            <div className={styles.priceBlock}>
              <span className={styles.priceInfo}>
                {price} {t("ProductsPageInformation.price")}
              </span>
              {hasDiscount ? (
                <span className={styles.oldPrice}>
                  {oldPrice} {t("ProductsPageInformation.price")}
                </span>
              ) : null}
            </div>
           
          </div>
           <div className={styles.actions}>
              <Link
                className={styles.detailsButton}
                href={`/${locale}${link.startsWith("/") ? link : `/${link}`}`}
              >
                {t("ProductsPageInformation.moreInfo")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <button
                disabled={!isInStock}
                className={styles.cartButton}
                onClick={handleAddToCart}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="8" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                  <circle cx="19" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 6H5.12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
        </div>
      </li>
    );
  }
);
PreviewProductItem.displayName = "PreviewProductItem";
export default PreviewProductItem;
