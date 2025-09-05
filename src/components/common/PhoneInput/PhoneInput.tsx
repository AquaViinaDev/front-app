"use client";

import "react-phone-input-2/lib/style.css";
import {
  default as BasePhoneInput,
  PhoneInputProps as BasePhoneInputProps,
} from "react-phone-input-2";
import { ChangeEvent, memo, useCallback } from "react";

import styles from "./PhoneInput.module.scss";

type ModifiedPhoneInputProps = Omit<BasePhoneInputProps, "onChange" | "value">;

export type PhoneInputProps = {
  onChange?: (value: string | null, e?: ChangeEvent<HTMLInputElement> | null) => void;
  value?: string | null;
  error?: boolean;
} & ModifiedPhoneInputProps;

const PhoneInput = memo(({ error = false, value, onChange, ...props }: PhoneInputProps) => {
  const wrappedOnChange = useCallback(
    (value: string, event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(value || null, event || null);
    },
    [onChange]
  );

  return (
    <BasePhoneInput
      country="md"
      value={value || "+373"}
      onChange={wrappedOnChange}
      inputProps={{
        name: "phone",
        required: true,
      }}
      dropdownStyle={{
        color: "black",
        textAlign: "left",
      }}
      containerClass={styles.container}
      inputClass={`${styles.input} ${error ? styles.error : ""}`}
      buttonClass={styles.button}
      {...props}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
