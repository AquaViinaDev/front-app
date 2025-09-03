import { Button } from "@/components/common";
import { useOrder } from "@/components/CartPage/CartContext";

import styles from "./CartGeneralBlock.module.scss";

const CartGeneralBlock = () => {
  const { totalAmount } = useOrder();
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Итого</h3>
      <div className={styles.amountWrapper}>
        <span className={styles.amountText}>Стоимость товаров </span>
        <span className={styles.amountText}>{totalAmount} лей</span>
      </div>
      <div className={styles.deliveryAmountWrapper}>
        <span className={styles.deliveryAmountText}>Доставка </span>
        <span className={styles.deliveryAmountText}>300 лей</span>
      </div>
      <div className={styles.totalAmountWrapper}>
        <span className={styles.totalAmountText}>Итого </span>
        <span className={styles.totalAmountText}>{totalAmount + 300} лей</span>
      </div>
      <Button type={"submit"} buttonType={"bigButton"}>
        Купить
      </Button>
    </div>
  );
};

export default CartGeneralBlock;
