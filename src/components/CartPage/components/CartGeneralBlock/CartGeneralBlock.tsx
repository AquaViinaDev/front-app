import { Button } from "@/components/common";
import { useOrder } from "@/components/CartPage/CartContext";

import styles from "./CartGeneralBlock.module.scss";
import { useTranslations } from "use-intl";

type CartGeneralBlockProps = {
  onBuy: () => void;
};

const CartGeneralBlock = ({ onBuy }: CartGeneralBlockProps) => {
  const { totalAmount } = useOrder();
  const t = useTranslations("CartPage.TotalBlock");

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
        <span className={styles.deliveryAmountText}>300 {t("current")}</span>
      </div>
      <div className={styles.totalAmountWrapper}>
        <span className={styles.totalAmountText}>{t("title")} </span>
        <span className={styles.totalAmountText}>
          {totalAmount + 300} {t("current")}
        </span>
      </div>
      <Button buttonType="bigButton" onClick={onBuy}>
        {t("buy")}
      </Button>
    </div>
  );
};

export default CartGeneralBlock;
