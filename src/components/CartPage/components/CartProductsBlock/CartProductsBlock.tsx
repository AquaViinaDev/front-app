import { CartProductItem } from "../CartProductItem";
import { CartProductItemType } from "../CartProductItem/CartProductItem";
import { getTotalQty } from "@components/utils";
import { useTranslations } from "use-intl";

import styles from "./CartProductsBlock.module.scss";

export type CartProductsBlockProps = {
  productItems: CartProductItemType[];
};

const CartProductsBlock = ({ productItems }: CartProductsBlockProps) => {
  const t = useTranslations("CartPage.CartProductsBlock");
  const totalQty = getTotalQty(productItems);
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>
        {totalQty} {t("title")}
      </h3>
      {productItems?.length >= 1 ? (
        <ul className={styles.itemsWrapper}>
          {productItems?.map((item) => (
            <CartProductItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <h3 className={styles.cartEmpty}>{t("emptyCart")}</h3>
      )}
    </div>
  );
};

export default CartProductsBlock;
