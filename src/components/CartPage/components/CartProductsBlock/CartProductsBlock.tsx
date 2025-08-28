"use client";
import { CartProductItem } from "../CartProductItem";

import styles from "./CartProductsBlock.module.scss";

const CartProductsBlock = () => {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>8 товаров</h3>
      <CartProductItem />
    </div>
  );
};

export default CartProductsBlock;
