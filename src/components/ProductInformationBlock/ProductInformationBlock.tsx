"use client";

import { useState, useCallback } from "react";
import { Button, CartAmount, Modal } from "@components/common";
import classNames from "classnames";
import Image from "next/image";
import { useLocale, useTranslations } from "use-intl";
import { useOrder } from "@components/CartPage/CartContext";
import { useRouter } from "next/navigation";

import styles from "./ProductInformationBlock.module.scss";

export type ProductInformationBlockProps = {
  productId: string;
  price: number;
  inStock: boolean;
  oldPrice?: number;
};

export const ProductInformationBlock = ({
  productId,
  price,
  inStock,
  oldPrice,
}: ProductInformationBlockProps) => {
  const [cartAmount, setCartAmount] = useState(1);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
  const openDeliveryModal = useCallback(() => setIsDeliveryModalOpen(true), []);
  const closeDeliveryModal = useCallback(() => setIsDeliveryModalOpen(false), []);
  const { items, addProduct, updateProductQty } = useOrder();
  const router = useRouter();
  const locale = useLocale();

  const openConditionsModal = useCallback(() => setIsConditionsModalOpen(true), []);
  const closeConditionsModal = useCallback(() => setIsConditionsModalOpen(false), []);

  const currentItem = items.find((i) => i.id === productId);

  const t = useTranslations();
  const hasDiscount = typeof oldPrice === "number" && Number.isFinite(oldPrice) && oldPrice > price;

  const handleQuickPurchase = () => {
    const currentItem = items.find((i) => i.id === productId);

    if (!currentItem) {
      addProduct(productId, cartAmount);
    }

    router.push(`/${locale}/cart`);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.leftBlock}>
          <div className={classNames(styles.leftBlockHeader, { [styles.withOldPrice]: hasDiscount })}>
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
          <CartAmount
            value={currentItem ? currentItem.qty : cartAmount}
            onChange={(value) => {
              if (currentItem) {
                updateProductQty(productId, value);
              } else {
                setCartAmount(value);
              }
            }}
          />
          </div>
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
              <span className={styles.textDelivery}>{t("ProductPage.modalServiceInfo.title")}</span>
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
              {hasDiscount && oldPrice && (
                oldPrice + t("ProductsPageInformation.price")
              )}
            </p>
            <p className={styles.priceInfo}>
              {price} {t("ProductsPageInformation.price")}
            </p>
          </div>
          <Button
            disabled={!inStock}
            buttonType={"bigButton"}
            onClick={() => addProduct(productId, cartAmount)}
          >
            {t("ProductsPageInformation.cartButton")}
          </Button>
          <Button disabled={!inStock} buttonType={"bigButton"} onClick={handleQuickPurchase}>
            {t("ProductsPageInformation.quickPurchaseButton")}
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isDeliveryModalOpen}
        onClose={closeDeliveryModal}
        title={t("ProductPage.modalDeliveryInfo.title")}
        bodyClassName={styles.bodyModal}
      >
        <div className={styles.deliveryOption}>
          <p className={styles.optionTitle}>
            {t("ProductPage.modalDeliveryInfo.chisinauDelivery.title")}
          </p>
          <p>{t("ProductPage.modalDeliveryInfo.chisinauDelivery.pay")}</p>
          <p>{t("ProductPage.modalDeliveryInfo.chisinauDelivery.freePay")}</p>
        </div>
        <div className={styles.deliveryOption}>
          <p className={styles.optionTitle}>
            {t("ProductPage.modalDeliveryInfo.countryDelivery.title")}
          </p>
          <p>{t("ProductPage.modalDeliveryInfo.countryDelivery.pay")}</p>
          <p>{t("ProductPage.modalDeliveryInfo.countryDelivery.freePay")}</p>
        </div>
        <div className={styles.actions}>
          <Button onClick={() => closeDeliveryModal()} buttonType="smallButton">
            {t("ProductPage.modalDeliveryInfo.confirm")}
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isConditionsModalOpen}
        onClose={closeConditionsModal}
        title={t("ProductPage.modalServiceInfo.title")}
        bodyClassName={styles.bodyModal}
      >
        <p className={styles.serviceModalText}>{t("ProductPage.modalServiceInfo.firstText")}</p>
        <p className={styles.serviceModalText}>{t("ProductPage.modalServiceInfo.secondText")}</p>
        <p className={styles.serviceModalText}>
          {t("ProductPage.modalServiceInfo.firstConditionText")}
        </p>
        <p className={styles.serviceModalText}>
          {t("ProductPage.modalServiceInfo.secondConditionText")}
        </p>
        <div className={styles.actions}>
          <Button
            onClick={() => {
              closeConditionsModal();
            }}
            buttonType="smallButton"
          >
            {t("ProductPage.modalServiceInfo.confirm")}
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ProductInformationBlock;
