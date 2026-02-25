import { Button } from "@components/common";
import { useOrder } from "@components/CartPage/CartContext";

import styles from "./CartGeneralBlock.module.scss";
import { useTranslations } from "use-intl";
import { useEffect } from "react";

type CartGeneralBlockProps = {
  onBuy: () => void;
};

const CartGeneralBlock = ({ onBuy }: CartGeneralBlockProps) => {
  const { products, totalAmount, deliveryZone, setDeliveryPrice, deliveryPrice } = useOrder();
  const t = useTranslations("CartPage.TotalBlock");
  const CHISINAU_FREE_FROM = 500;
  const MOLDOVA_FREE_FROM = 1000;

  useEffect(() => {
    if (deliveryZone === "chisinau") {
      setDeliveryPrice(totalAmount >= CHISINAU_FREE_FROM ? 0 : 80);
      return;
    }

    if (deliveryZone === "moldova") {
      setDeliveryPrice(totalAmount >= MOLDOVA_FREE_FROM ? 0 : 100);
      return;
    }

    setDeliveryPrice(0);
  }, [deliveryZone, totalAmount, setDeliveryPrice]);

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{t("title")}</h3>
      <div className={styles.amountWrapper}>
        <span className={styles.amountText}>{t("costOfGoods")} </span>
        <span className={styles.amountText}>
          {totalAmount} {t("current")}
        </span>
      </div>
      <div className={styles.deliveryAmountWrapper}>
        <span className={styles.deliveryAmountText}>{t("delivery")} </span>
        <span className={styles.deliveryAmountText}>
          {products.length === 0 ? 0 : deliveryPrice} {t("current")}
        </span>
      </div>
      <div className={styles.totalAmountWrapper}>
        <span className={styles.totalAmountText}>{t("title")} </span>
        <span className={styles.totalAmountText}>
          {products.length === 0 ? 0 : totalAmount + deliveryPrice} {t("current")}
        </span>
      </div>
      <Button buttonType="bigButton" onClick={onBuy}>
        {t("buy")}
      </Button>
    </div>
  );
};

export default CartGeneralBlock;
