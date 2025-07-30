"use client";

import { useState } from "react";
import { Button, CartAmount } from "@/components/common";
import classNames from "classnames";

import styles from "./ProductInformationBlock.module.scss";

export type ProductInformationBlockProps = {
  productId: string;
  price: number;
  inStock: boolean;
  description: string;
};

export const ProductInformationBlock = ({
  // productId,
  price,
  inStock,
  description,
}: ProductInformationBlockProps) => {
  const [cartAmount, setCartAmount] = useState(1);

  // const handleAddToCart = async () => {
  //   await fetch("/api/cart", {
  //     method: "POST",
  //     body: JSON.stringify({ productId, quantity: cartAmount }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  return (
    <div className={styles.infoWrapper}>
      <div className={styles.additionalContent}>
        <p className={styles.priceInfo}>{price} лей/шт.</p>
        <p
          className={classNames(styles.stockInfo, {
            [styles.inStock]: inStock,
            [styles.noStock]: !inStock,
          })}
        >
          {inStock ? "В наличии" : "Нет в наличии"}
        </p>
        <CartAmount value={cartAmount} onChange={setCartAmount} />
        <Button
          buttonType={"smallButton"}
          // onClick={handleAddToCart}
        >
          В корзину
        </Button>
      </div>
      <div className={styles.descriptionWrapper}>
        <p className={styles.title}>Описание:</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
export default ProductInformationBlock;
