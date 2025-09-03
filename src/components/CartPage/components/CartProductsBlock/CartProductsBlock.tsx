import { CartProductItem } from "../CartProductItem";
import { CartProductItemType } from "../CartProductItem/CartProductItem";

import styles from "./CartProductsBlock.module.scss";

export type CartProductsBlockProps = {
  items: CartProductItemType[];
};

const CartProductsBlock = ({ items }: CartProductsBlockProps) => {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{items?.length} товаров</h3>
      {items.length >= 1 ? (
        <ul className={styles.itemsWrapper}>
          {items?.map((item) => (
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
