"use client";

import { FormEvent } from "react";
import { Button } from "@components/common/Button";
import { PhoneInput } from "@components/common/PhoneInput";
import { TextInput } from "@components/common/TextInput";
import type { ButtonProps } from "@components/common/Button/Button";
import classNames from "classnames";
import Link from "next/link";
import { useLocale } from "use-intl";
import { RoutesEnum } from "@types";

import styles from "./LeadForm.module.scss";

type LeadFormErrors = {
  name?: boolean;
  phone?: boolean;
  privacy?: boolean;
};

export type LeadFormProps = {
  name: string;
  phone: string;
  errors: LeadFormErrors;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  formClassName?: string;
  nameInputClassName?: string;
  phoneInputClassName?: string;
  buttonType?: ButtonProps["buttonType"];
  buttonClassName?: string;
  privacyAccepted: boolean;
  onPrivacyAcceptedChange: (value: boolean) => void;
  submitDisabled?: boolean;
};

export const LeadForm = ({
  name,
  phone,
  errors,
  onNameChange,
  onPhoneChange,
  onSubmit,
  submitLabel,
  formClassName,
  nameInputClassName,
  phoneInputClassName,
  buttonType = "bigButton",
  buttonClassName,
  privacyAccepted,
  onPrivacyAcceptedChange,
  submitDisabled = false,
}: LeadFormProps) => {
  const locale = useLocale();
  const isRo = locale === "ro";

  return (
    <form className={classNames(formClassName, styles.root)} onSubmit={onSubmit}>
      <TextInput
        className={styles.textInput}
        textInputClassName={nameInputClassName}
        value={name}
        onChange={(value) => onNameChange(value ?? "")}
        error={Boolean(errors.name)}
      />
      <PhoneInput
        value={phone}
        onChange={(value) => onPhoneChange(value ?? "")}
        error={Boolean(errors.phone)}
        inputClass={phoneInputClassName}
      />
      <label className={classNames(styles.consentLabel, { [styles.error]: Boolean(errors.privacy) })}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={privacyAccepted}
          onChange={(event) => onPrivacyAcceptedChange(event.target.checked)}
        />
        <span className={styles.consentText}>
          {isRo
            ? "Sunt de acord cu prelucrarea datelor personale conform "
            : "Я согласен(а) с обработкой персональных данных в соответствии с "}
          <Link className={styles.policyLink} href={`/${locale}${RoutesEnum.PrivacyPolicy}`}>
            {isRo ? "Politicii de confidențialitate" : "Политикой конфиденциальности"}
          </Link>
        </span>
      </label>
      <Button
        buttonType={buttonType}
        className={classNames(buttonClassName, styles.button)}
        disabled={submitDisabled}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default LeadForm;
