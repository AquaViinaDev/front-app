import { ChangeEvent, memo } from "react";
import classNames from "classnames";

import styles from "./CartAmount.module.scss";

export type CartAmountProps = {
  value: number;
  onChange: (amount: number) => void;
  className?: string;
};

const MIN_AMOUNT = 1;

const CartAmount = memo(({ value, onChange, className }: CartAmountProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value.replace(/,/g, "."));

    if (!isNaN(newValue)) {
      onChange(Math.max(MIN_AMOUNT, Math.floor(newValue)));
    }
  };

  const handleDecrement = () => onChange(Math.max(MIN_AMOUNT, value - 1));
  const handleIncrement = () => onChange(value + 1);
  const isDecreaseDisabled = value <= MIN_AMOUNT;

  return (
    <div className={classNames(styles.root, className)}>
      <button
        type="button"
        className={classNames(styles.controlButton, styles.decrementAmount)}
        onClick={handleDecrement}
        aria-label="Уменьшить количество"
        disabled={isDecreaseDisabled}
      >
        -
      </button>
      <input
        className={styles.inputAmount}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        name="cartAmount"
        value={value}
        min={MIN_AMOUNT}
        onChange={handleInputChange}
        aria-label="Количество товара"
      />
      <button
        type="button"
        className={classNames(styles.controlButton, styles.incrementAmount)}
        onClick={handleIncrement}
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
});

CartAmount.displayName = "CartAmount";

export default CartAmount;
