import { CartProductItem } from "../CartProductItem";
import { CartProductItemType } from "../CartProductItem/CartProductItem";
import { getTotalQty } from "@/components/utils";

import styles from "./CartProductsBlock.module.scss";

export type CartProductsBlockProps = {
  productItems: CartProductItemType[];
};

const CartProductsBlock = ({ productItems }: CartProductsBlockProps) => {
  const totalQty = getTotalQty(productItems);
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{totalQty} товаров</h3>
      {productItems?.length >= 1 ? (
        <ul className={styles.itemsWrapper}>
          {productItems?.map((item) => (
            <CartProductItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <h3 className={styles.cartEmpty}>Корзина пустая</h3>
      )}
    </div>
  );
};

export default CartProductsBlock;
