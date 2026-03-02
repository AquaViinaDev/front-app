"use client";

import { ChangeEvent, memo, useCallback, useMemo } from "react";
import classNames from "classnames";
import { useTranslations } from "use-intl";

import styles from "./PhoneInput.module.scss";

export type PhoneInputProps = {
  label?: boolean;
  onChange?: (value: string | null, e?: ChangeEvent<HTMLInputElement> | null) => void;
  value?: string | null;
  error?: boolean;
  errorMessage?: string;
  inputClass?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
};

const COUNTRY_CODE = "373";
const PREFIX = `+${COUNTRY_CODE}`;
const MAX_LOCAL_DIGITS = 8;

const extractLocalDigits = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.startsWith(COUNTRY_CODE)) {
    return digitsOnly.slice(COUNTRY_CODE.length, COUNTRY_CODE.length + MAX_LOCAL_DIGITS);
  }

  return digitsOnly.slice(0, MAX_LOCAL_DIGITS);
};

const PhoneInput = memo(
  ({
    label = true,
    error = false,
    value,
    errorMessage,
    onChange,
    inputClass,
    name = "phone",
    required = true,
    autoComplete = "tel-national",
  }: PhoneInputProps) => {
    const t = useTranslations("Common");

    const localDigits = useMemo(() => extractLocalDigits(value ?? ""), [value]);

    const wrappedOnChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const normalizedDigits = extractLocalDigits(event.target.value);
        onChange?.(`${PREFIX}${normalizedDigits}`, event);
      },
      [onChange]
    );

    return (
      <div className={styles.root}>
        {label && <label className={styles.label}>{t("phoneLabel")}</label>}
        <div className={styles.field}>
          <span className={styles.prefix}>{PREFIX}</span>
          <input
            type="tel"
            name={name}
            required={required}
            autoComplete={autoComplete}
            inputMode="numeric"
            pattern="[0-9]*"
            value={localDigits}
            maxLength={MAX_LOCAL_DIGITS}
            className={classNames(styles.input, inputClass, { [styles.error]: error })}
            placeholder="XXXXXXXX"
            onChange={wrappedOnChange}
          />
        </div>
        {errorMessage ? <span className={styles.errorMessage}>{errorMessage}</span> : null}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
