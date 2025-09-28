import { HTMLAttributes, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common";
import { useLocale, useTranslations } from "use-intl";
import { useOrder } from "@/components/CartPage/CartContext";
import classNames from "classnames";
import { toast } from "react-toastify";

import styles from "./PreviewProductItem.module.scss";

export type PreviewProductItemTypeProps = HTMLAttributes<HTMLLIElement> & {
  id: string;
  image: string;
  title: string;
  isInStock?: boolean;
  price?: string;
  link: string;
};

const PreviewProductItem = memo(
  ({ id, title, link, price, image, isInStock, ...props }: PreviewProductItemTypeProps) => {
    const locale = useLocale();
    const t = useTranslations();
    const { addProduct } = useOrder();

    const handleAddToCart = () => {
      if (!isInStock) return;

      addProduct(id);
      toast.success(`Товар успешно добавлен!`);
    };

    return (
      <li className={styles.root} {...props}>
        <Link href={`/${locale}${link.startsWith("/") ? link : `/${link}`}`}>
          <Image
            src={image ? `${process.env.NEXT_PUBLIC_API_URL}${image}` : null}
            alt={title}
            width={180}
            height={180}
            className={styles.itemImage}
          />
          <h3 className={styles.title}>{title}</h3>
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
              : `${t("ProductsPageInformation.isn'tInStock")}`}
          </p>
          <p className={styles.priceInfo}>
            {price} {t("ProductsPageInformation.price")}
          </p>
          <Button buttonType={"smallButton"} onClick={handleAddToCart}>
            {t("ProductsPageInformation.cartButton")}
          </Button>
        </div>
      </li>
    );
  }
);
PreviewProductItem.displayName = "PreviewProductItem";
export default PreviewProductItem;
