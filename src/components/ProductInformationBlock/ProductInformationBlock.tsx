"use client";

import { useState, useCallback } from "react";
import { Button, CartAmount, Modal } from "@/components/common";
import classNames from "classnames";
import Image from "next/image";
import { useTranslations } from "use-intl";

import styles from "./ProductInformationBlock.module.scss";

export type ProductInformationBlockProps = {
  productId: string;
  price: number;
  inStock: boolean;
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

  const t = useTranslations();

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
          <p className={styles.priceInfo}>
            {price} {t("ProductsPageInformation.price")}
          </p>
          <p
            className={classNames(styles.stockInfo, {
              [styles.inStock]: inStock,
              [styles.noStock]: !inStock,
            })}
          >
            {inStock
              ? `${t("ProductsPageInformation.isInStock")}`
              : `${t("ProductsPageInformation.isn'tStock")}`}
          </p>
          <CartAmount value={cartAmount} onChange={setCartAmount} />
          <Button
            buttonType={"bigButton"}
            // onClick={handleAddToCart}
          >
            {t("ProductsPageInformation.cartButton")}
          </Button>
        </div>
        <div className={styles.additionalContent}>
          <div className={styles.deliveryBlock} onClick={openModal} role="button" tabIndex={0}>
            <Image src={"/delivery-truck.svg"} alt={"Delivery truck"} width={36} height={36} />
            <span className={styles.textDelivery}>{t("ProductPage.modalInfo.title")}*</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={t("ProductPage.modalInfo.title")}>
        <p className={styles.deliveryText}>
          {t("ProductPage.modalInfo.firstCondition")} —{" "}
          <span>300 {t("ProductPage.modalInfo.price")}</span>
        </p>
        <p className={styles.deliveryText}>
          {t("ProductPage.modalInfo.secondCondition")} —{" "}
          <span>1000 {t("ProductPage.modalInfo.price")}</span>
        </p>
        <div className={styles.deliveryOption}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={withDelivery} onChange={toggleDelivery} />
            <span>{t("ProductPage.modalInfo.delivery")}</span>
          </label>
          <div className={styles.actions}>
            <Button
              onClick={() => {
                console.log("доставка выбрана:", withDelivery);
                closeModal();
              }}
              buttonType="smallButton"
            >
              {t("ProductPage.modalInfo.confirm")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProductInformationBlock;
