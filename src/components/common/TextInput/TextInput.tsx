"use client";

import { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, memo, useCallback } from "react";

import { useTranslations } from "use-intl";

import styles from "./TextInput.module.scss";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

export type TextInputProps = NativeInputProps & {
  onChange?: (value: string | null, e?: ChangeEvent<HTMLInputElement> | null) => void;
  value?: string | null;
};

const TextInput = memo(({ value, onChange, ...props }: TextInputProps) => {
  const t = useTranslations("CommunicationSection");
  const wrappedOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => onChange?.(e?.target?.value || null, e),
    [onChange]
  );

  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor="textInput">
        {t("labelInput")}
      </label>
      <input
        type="text"
        id="textInput"
        className={styles.textInput}
        value={value || ""}
        {...props}
        onChange={wrappedOnChange}
      />
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
