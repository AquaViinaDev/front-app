import { memo } from "react";

import styles from "./CartAmount.module.scss";

export type CartAmountProps = {
  value: number;
  onChange: (amount: number) => void;
};

const CartAmount = memo(({ value, onChange }: CartAmountProps) => {
  return (
    <div className={styles.root}>
      <button className={styles.decrementAmount} onClick={() => onChange(Math.max(1, value - 1))}>
        -
      </button>
      <input className={styles.inputAmount} type="number" value={value} readOnly={true} min={1} />
      <button className={styles.incrementAmount} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
});

CartAmount.displayName = "CartAmount";

export default CartAmount;
