import { memo } from "react";
import classNames from "classnames";

import styles from "./CartAmount.module.scss";

export type CartAmountProps = {
  value: number;
  onChange: (amount: number) => void;
  className?: string;
};

const CartAmount = memo(({ value, onChange, className }: CartAmountProps) => {
  return (
    <div className={classNames(className, styles.root)}>
      <button className={styles.decrementAmount} onClick={() => onChange(Math.max(1, value - 1))}>
        -
      </button>
      <input
        className={styles.inputAmount}
        type="number"
        name="cartAmount"
        value={value}
        readOnly={true}
        min={1}
      />
      <button className={styles.incrementAmount} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
});

CartAmount.displayName = "CartAmount";

export default CartAmount;
