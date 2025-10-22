import Link from "next/link";
import Image from "next/image";
import { CartAmount } from "@components/common";
import RemoveIcon from "@assets/icons/remove-icon.svg";
import { useOrder } from "@components/CartPage/CartContext";
import { useLocale, useTranslations } from "use-intl";
import { resolveMediaUrl } from "@lib/api";

import styles from "./CartProductItem.module.scss";

export type CartProductItemType = {
  id: string;
  name: {
    ro: string;
    ru: string;
  };
  image: string;
  price: number;
  qty: number;
  totalPrice: number;
};

export type CartProductItemProps = {
  item: CartProductItemType;
};

const CartProductItem = ({ item }: CartProductItemProps) => {
  const t = useTranslations("CartPage.CartProductsBlock");
  const { id, name, image, price, qty, totalPrice } = item;
  const locale = useLocale();
  const { updateProductQty, removeProduct } = useOrder();
  const resolvedImage = image ? resolveMediaUrl(image) : null;
  const shouldDisableOptimization =
    !!resolvedImage &&
    (!resolvedImage.startsWith("/") || resolvedImage.toLowerCase().includes(".heic"));

  const link = `/products/${id}`;
  return (
    <div className={styles.root}>
      <Link className={styles.link} href={`/${locale}${link.startsWith("/") ? link : `/${link}`}`}>
        <Image
          src={resolvedImage ?? "/images/cuvshinExample.png"}
          alt={name?.ro ?? "Product Image"}
          width={81}
          height={81}
          className={styles.itemImage}
          unoptimized={shouldDisableOptimization}
        />
        <h3 className={styles.title}>{locale === "ru" ? name?.ru : name?.ro}</h3>
      </Link>
      <div className={styles.counter}>
        <CartAmount
          className={styles.cartAmount}
          onChange={(value) => updateProductQty(id, value)}
          value={qty}
        />
        <p className={styles.onePrice}>
          * {price} {t("current")}
        </p>
        <p className={styles.totalPrice}>
          {totalPrice} {t("current")}
        </p>
      </div>
      <button className={styles.removeBtn} onClick={() => removeProduct(id)}>
        <RemoveIcon />
      </button>
    </div>
  );
};

export default CartProductItem;
