"use client";

import { FormEvent } from "react";
import { Button } from "@components/common/Button";
import { PhoneInput } from "@components/common/PhoneInput";
import { TextInput } from "@components/common/TextInput";
import type { ButtonProps } from "@components/common/Button/Button";
import classNames from "classnames";

import styles from "./LeadForm.module.scss";

type LeadFormErrors = {
  name?: boolean;
  phone?: boolean;
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
}: LeadFormProps) => {
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
      <Button buttonType={buttonType} className={classNames(buttonClassName, styles.button)}>
        {submitLabel}
      </Button>
    </form>
  );
};

export default LeadForm;
