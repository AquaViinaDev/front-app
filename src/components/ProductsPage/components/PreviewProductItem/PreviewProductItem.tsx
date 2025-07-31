import { HTMLAttributes, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common";
import { useLocale } from "use-intl";
import classNames from "classnames";

import styles from "./PreviewProductItem.module.scss";

export type PreviewProductItemTypeProps = HTMLAttributes<HTMLLIElement> & {
  image: string;
  title: string;
  isInStock?: boolean;
  price?: string;
  buttonName: string;
  link: string;
};

const PreviewProductItem = memo(
  ({ title, link, buttonName, price, isInStock, ...props }: PreviewProductItemTypeProps) => {
    const locale = useLocale();

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
            {isInStock ? "В наличии" : "Нет в наличии"}
          </p>
          <p className={styles.priceInfo}>{price} лей</p>
          <Button buttonType={"smallButton"}>{buttonName}</Button>
        </div>
      </li>
    );
  }
);
PreviewProductItem.displayName = "PreviewProductItem";
export default PreviewProductItem;
