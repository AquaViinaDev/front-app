import { Button } from "@/components/common";
import { useOrder } from "@/components/CartPage/CartContext";

import styles from "./CartGeneralBlock.module.scss";
import { useTranslations } from "use-intl";
import { useEffect, useState } from "react";

type CartGeneralBlockProps = {
  onBuy: () => void;
};

const CartGeneralBlock = ({ onBuy }: CartGeneralBlockProps) => {
  const { totalAmount, deliveryZone } = useOrder();
  const [delivery, setDelivery] = useState<number>(0);
  const t = useTranslations("CartPage.TotalBlock");

  const defineDelivery = () => {
    if (deliveryZone === "chisinau") {
      if (totalAmount > 500) {
        setDelivery(0);
      } else {
        setDelivery(80);
      }
    } else if (deliveryZone === "moldova") {
      if (totalAmount > 1000) {
        setDelivery(0);
      } else {
        setDelivery(100);
      }
    } else {
      setDelivery(0);
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
          {delivery} {t("current")}
        </span>
      </div>
      <div className={styles.totalAmountWrapper}>
        <span className={styles.totalAmountText}>{t("title")} </span>
        <span className={styles.totalAmountText}>
          {totalAmount} {t("current")}
        </span>
      </div>
      <Button buttonType="bigButton" onClick={onBuy}>
        {t("buy")}
      </Button>
    </div>
  );
};

export default CartGeneralBlock;
