import { HTMLAttributes, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common";
import { useLocale, useTranslations } from "use-intl";
import classNames from "classnames";

import styles from "./PreviewProductItem.module.scss";

export type PreviewProductItemTypeProps = HTMLAttributes<HTMLLIElement> & {
  image: string;
  title: string;
  isInStock?: boolean;
  price?: string;
  link: string;
};

const PreviewProductItem = memo(
  ({ title, link, price, isInStock, ...props }: PreviewProductItemTypeProps) => {
    const locale = useLocale();
    const t = useTranslations();

    return (
      <li className={styles.root} {...props}>
        <Link href={`/${locale}${link.startsWith("/") ? link : `/${link}`}`}>
          <Image
            src={"/images/cuvshinExample.png"}
            alt={title}
            width={180}
            height={180}
            className={styles.itemImage}
          />
          <h3>{title}</h3>
        </Link>
        <div className={styles.bottomBlockWrapper}>
          <p
            className={classNames(styles.stockInfo, {
              [styles.inStock]: isInStock,
              [styles.noStock]: !isInStock,
            })}
          >
            {isInStock
              ? `${t("ProductsPageInformation.isInStock")}`
              : `${t("ProductsPageInformation.isn'tStock")}`}
          </p>
          <p className={styles.priceInfo}>
            {price} {t("ProductsPageInformation.price")}
          </p>
          <Button buttonType={"smallButton"}>{t("ProductsPageInformation.cartButton")}</Button>
        </div>
      </li>
    );
  }
);
PreviewProductItem.displayName = "PreviewProductItem";
export default PreviewProductItem;
