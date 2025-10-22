"use client";

import "react-phone-input-2/lib/style.css";
import {
  default as BasePhoneInput,
  PhoneInputProps as BasePhoneInputProps,
} from "react-phone-input-2";
import { ChangeEvent, memo, useCallback } from "react";
import { useLocale } from "use-intl";

import styles from "./PhoneInput.module.scss";

type ModifiedPhoneInputProps = Omit<BasePhoneInputProps, "onChange" | "value">;

export type PhoneInputProps = {
  label?: boolean;
  onChange?: (value: string | null, e?: ChangeEvent<HTMLInputElement> | null) => void;
  value?: string | null;
  error?: boolean;
  errorMessage?: string;
} & ModifiedPhoneInputProps;

const PhoneInput = memo(
  ({ label = true, error = false, value, errorMessage, onChange, ...props }: PhoneInputProps) => {
    const locale = useLocale();
    const wrappedOnChange = useCallback(
      (value: string, event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(value || null, event || null);
      },
      [onChange]
    );

    return (
      <div className={styles.root}>
        {label && <label className={styles.label}>{locale === "ru" ? "Телефон" : "Telefon"}</label>}
        <BasePhoneInput
          country="md"
          value={value || ""}
          onChange={wrappedOnChange}
          inputProps={{
            name: "phone",
            required: true,
          }}
          dropdownStyle={{
            maxHeight: "130px",
            color: "black",
            textAlign: "left",
          }}
          containerClass={styles.container}
          inputClass={`${styles.input} ${error ? styles.error : ""}`}
          buttonClass={styles.button}
          {...props}
        />
        {errorMessage ? <span className={styles.errorMessage}>{errorMessage}</span> : null}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
