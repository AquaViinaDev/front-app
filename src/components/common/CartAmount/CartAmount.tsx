import { ChangeEvent, memo } from "react";
import classNames from "classnames";

import styles from "./CartAmount.module.scss";

export type CartAmountProps = {
  value: number;
  onChange: (amount: number) => void;
  className?: string;
};

const CartAmount = memo(({ value, onChange, className }: CartAmountProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    if (!isNaN(newValue)) {
      onChange(Math.max(1, newValue));
    }
  };

  return (
    <div className={classNames(className, styles.root)}>
      <button
        type="button"
        className={styles.decrementAmount}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        -
      </button>
      <input
        className={styles.inputAmount}
        type="number"
        name="cartAmount"
        value={value}
        min={1}
        onChange={handleInputChange}
      />
      <button type="button" className={styles.incrementAmount} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
});

CartAmount.displayName = "CartAmount";

export default CartAmount;
