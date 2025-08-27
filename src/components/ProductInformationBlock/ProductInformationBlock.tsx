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
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
  const [withDelivery, setWithDelivery] = useState(false);

  const openDeliveryModal = useCallback(() => setIsDeliveryModalOpen(true), []);
  const closeDeliveryModal = useCallback(() => setIsDeliveryModalOpen(false), []);

  const openConditionsModal = useCallback(() => setIsConditionsModalOpen(true), []);
  const closeConditionsModal = useCallback(() => setIsConditionsModalOpen(false), []);

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
        <div className={styles.leftBlock}>
          <p
            className={classNames(styles.stockInfo, {
              [styles.inStock]: inStock,
              [styles.noStock]: !inStock,
            })}
          >
            {inStock
              ? `${t("ProductsPageInformation.isInStock")}`
              : `${t("ProductsPageInformation.isn'tInStock")}`}
          </p>
          <CartAmount value={cartAmount} onChange={setCartAmount} />
          <div className={styles.additionalContent}>
            <div
              className={styles.deliveryBlock}
              onClick={openDeliveryModal}
              role="button"
              tabIndex={0}
            >
              <Image src={"/delivery-truck.svg"} alt={"Delivery truck"} width={36} height={36} />
              <span className={styles.textDelivery}>
                {t("ProductPage.modalDeliveryInfo.title")}*
              </span>
            </div>
            <div
              className={styles.conditionBlock}
              onClick={openConditionsModal}
              role="button"
              tabIndex={0}
            >
              <Image src={"/service-icon.svg"} alt={"Service"} width={36} height={36} />
              <span className={styles.textDelivery}>
                {t("ProductPage.modalConditionsInfo.title")}
              </span>
            </div>
            <div className={styles.returnBlock}>
              <Image src={"/return-icon.svg"} alt={"Delivery truck"} width={36} height={36} />
              <span className={styles.textDelivery}>
                {t("ProductPage.modalGuaranteeInfo.title")}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.priceBlock}>
            <p className={styles.saleInfo}>
              {price} {t("ProductsPageInformation.price")}
            </p>
            <p className={styles.priceInfo}>
              {price} {t("ProductsPageInformation.price")}
            </p>
          </div>
          <Button
            buttonType={"bigButton"}
            // onClick={handleAddToCart}
          >
            {t("ProductsPageInformation.cartButton")}
          </Button>
          <Button
            buttonType={"bigButton"}
            // onClick={handleAddToCart}
          >
            {t("ProductsPageInformation.quickPurchaseButton")}
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isDeliveryModalOpen}
        onClose={closeDeliveryModal}
        title={t("ProductPage.modalDeliveryInfo.title")}
      >
        <p className={styles.deliveryText}>
          {t("ProductPage.modalDeliveryInfo.firstCondition")} —{" "}
          <span>300 {t("ProductPage.modalDeliveryInfo.price")}</span>
        </p>
        <p className={styles.deliveryText}>
          {t("ProductPage.modalDeliveryInfo.secondCondition")} —{" "}
          <span>1000 {t("ProductPage.modalDeliveryInfo.price")}</span>
        </p>
        <div className={styles.deliveryOption}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={withDelivery} onChange={toggleDelivery} />
            <span>{t("ProductPage.modalDeliveryInfo.delivery")}</span>
          </label>
          <div className={styles.actions}>
            <Button
              onClick={() => {
                console.log("доставка выбрана:", withDelivery);
                closeDeliveryModal();
              }}
              buttonType="smallButton"
            >
              {t("ProductPage.modalDeliveryInfo.confirm")}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isConditionsModalOpen}
        onClose={closeConditionsModal}
        title={t("ProductPage.modalDeliveryInfo.title")}
      >
        <p className={styles.conditionsDescription}>
          {t("ProductPage.modalConditionsInfo.description")}
        </p>
        <div className={styles.actions}>
          <Button
            onClick={() => {
              closeConditionsModal();
            }}
            buttonType="smallButton"
          >
            {t("ProductPage.modalConditionsInfo.confirm")}
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ProductInformationBlock;
