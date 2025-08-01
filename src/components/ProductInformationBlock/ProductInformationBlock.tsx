"use client";

import { useState, useCallback } from "react";
import { Button, CartAmount, Modal } from "@/components/common";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withDelivery, setWithDelivery] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const toggleDelivery = useCallback(() => setWithDelivery((v) => !v), []);

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
    <>
      <div className={styles.root}>
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
          <div className={styles.deliveryBlock} onClick={openModal} role="button" tabIndex={0}>
            <Image src={"/delivery-truck.svg"} alt={"Delivery truck"} width={36} height={36} />
            <span className={styles.textDelivery}>Условия доставки*</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Условия доставки">
        <p className={styles.deliveryText}>
          По Кишиневу доставка — <span>300 лей</span>
        </p>
        <p className={styles.deliveryText}>
          По Молдове — <span>1000 лей</span>
        </p>
        <div className={styles.deliveryOption}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={withDelivery} onChange={toggleDelivery} />
            <span>Мне нужна доставка</span>
          </label>
          <div className={styles.actions}>
            <Button
              onClick={() => {
                console.log("доставка выбрана:", withDelivery);
                closeModal();
              }}
              buttonType="smallButton"
            >
              Подтвердить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProductInformationBlock;
