"use client";

import { PhoneInput, TextInput, Button } from "@/components/common";
import { useCallback, useState } from "react";
import { useTranslations } from "use-intl";

import styles from "./CommunicationForm.module.scss";

const CommunicationForm = () => {
  const [name, setName] = useState<string | null>("");
  const [phone, setPhone] = useState<string | null>("");
  const t = useTranslations("CommunicationSection");

  const handleNameChange = useCallback((value: string | null) => {
    setName(value ?? "");
  }, []);

  const handlePhoneChange = useCallback((value: string | null) => {
    setPhone(value ?? "");
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (phone && phone.length <= 10) return;
        setName(null);
        setPhone(null);
      }}
    >
      <TextInput required value={name} onChange={handleNameChange} />
      <PhoneInput value={phone} onChange={handlePhoneChange} />
      <Button className={styles.button}>{t("textButton")}</Button>
    </form>
  );
};

export default CommunicationForm;
