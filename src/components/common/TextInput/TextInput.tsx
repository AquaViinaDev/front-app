"use client";

import { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, memo, useCallback } from "react";
import { useTranslations } from "use-intl";
import classNames from "classnames";

import styles from "./TextInput.module.scss";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

export type TextInputProps = NativeInputProps & {
  onChange?: (value: string | null, e?: ChangeEvent<HTMLInputElement> | null) => void;
  value?: string | null;
  isLabel?: boolean;
  textInputClassName?: string;
  error?: boolean;
  className?: string;
};

const TextInput = memo(
  ({
    className,
    error = false,
    textInputClassName,
    value,
    onChange,
    isLabel = true,
    ...props
  }: TextInputProps) => {
    const t = useTranslations("CommunicationSection");
    const wrappedOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => onChange?.(e?.target?.value || null, e),
      [onChange]
    );

    return (
      <div className={classNames(className, styles.root)}>
        {isLabel ? (
          <label className={styles.label} htmlFor="textInput">
            {t("labelInput")}
          </label>
        ) : null}
        <input
          type="text"
          id="textInput"
          className={classNames(textInputClassName, styles.textInput, {
            [styles.error]: error,
          })}
          value={value || ""}
          {...props}
          onChange={wrappedOnChange}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
