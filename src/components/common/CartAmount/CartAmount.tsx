"use client";

import { ChangeEvent, memo } from "react";
import classNames from "classnames";
import { useTranslations } from "use-intl";

import styles from "./CartAmount.module.scss";

export type CartAmountProps = {
  value: number;
  onChange: (amount: number) => void;
  className?: string;
  size?: "default" | "compact";
};

const MIN_AMOUNT = 1;

const CartAmount = memo(({ value, onChange, className, size = "default" }: CartAmountProps) => {
  const t = useTranslations("Common.cartAmount");
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
    <div className={classNames(styles.root, styles[size], className)}>
      <button
        type="button"
        className={classNames(styles.controlButton, styles.decrementAmount)}
        onClick={handleDecrement}
        aria-label={t("decrease")}
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
        aria-label={t("label")}
      />
      <button
        type="button"
        className={classNames(styles.controlButton, styles.incrementAmount)}
        onClick={handleIncrement}
        aria-label={t("increase")}
      >
        +
      </button>
    </div>
  );
});

CartAmount.displayName = "CartAmount";

export default CartAmount;
