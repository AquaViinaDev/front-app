"use client";

import { useState } from "react";
import { Button, CartAmount } from "@/components/common";
import classNames from "classnames";

import styles from "./ProductInformationBlock.module.scss";
import Image from "next/image";

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
      <div className={styles.orderBlock}>
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
          buttonType={"bigButton"}
          // onClick={handleAddToCart}
        >
          В корзину
        </Button>
      </div>
      <div className={styles.additionalContent}>
        <div className={styles.deliveryBlock}>
          <Image src={"/delivery-truck.svg"} alt={"Delivery truck"} width={36} height={36} />
          <span className={styles.textDelivery}>Условия доставки*</span>
        </div>
      </div>
    </div>
  );
};
export default ProductInformationBlock;
