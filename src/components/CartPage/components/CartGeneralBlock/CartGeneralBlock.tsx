import { Button } from "@/components/common";
import { useOrder } from "@/components/CartPage/CartContext";

import styles from "./CartGeneralBlock.module.scss";
import { useTranslations } from "use-intl";
import { useEffect } from "react";

type CartGeneralBlockProps = {
  onBuy: () => void;
};

const CartGeneralBlock = ({ onBuy }: CartGeneralBlockProps) => {
  const { products, totalAmount, deliveryZone, setDeliveryPrice, deliveryPrice } = useOrder();
  const t = useTranslations("CartPage.TotalBlock");

  const defineDelivery = () => {
    if (deliveryZone === "chisinau") {
      if (totalAmount > 500) {
        setDeliveryPrice(0);
      } else {
        setDeliveryPrice(80);
      }
    } else if (deliveryZone === "moldova") {
      if (totalAmount > 1000) {
        setDeliveryPrice(0);
      } else {
        setDeliveryPrice(100);
      }
    } else {
      setDeliveryPrice(0);
    }
  };

  useEffect(() => {
    defineDelivery();
  }, [deliveryZone, totalAmount, defineDelivery]);

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
