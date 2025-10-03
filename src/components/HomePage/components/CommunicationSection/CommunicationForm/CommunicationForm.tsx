"use client";

import { PhoneInput, TextInput, Button } from "@/components/common";
import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { sendConsultation } from "@/lib/api";

import styles from "./CommunicationForm.module.scss";

const CommunicationForm = () => {
  const local = useLocale();
  const t = useTranslations("CommunicationSection");
  const tServicePage = useTranslations("ServicePage");

  const [name, setName] = useState<string | null>("");
  const [phone, setPhone] = useState<string | null>("");

  const userLang = local === "ru" ? "русский язык" : "румынский язык";

  const handleNameChange = useCallback(
    (value: string | null) => {
      setName(value ?? "");
    },
    [userLang]
  );

  const handlePhoneChange = useCallback((value: string | null) => {
    setPhone(value ?? "");
  }, []);

  const consultationMutation = useMutation({
    mutationFn: sendConsultation,
    onSuccess: () => {
      toast.success(tServicePage("successOrder"));
      setName("");
      setPhone("");
    },
    onError: () => {
      toast.error(tServicePage("errorOrder"));
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        const nameWithLang = `${name} - язык (${local})`;
        if (!name || !phone || phone.length <= 10) return;
        consultationMutation.mutate({ name: nameWithLang, phone });
      }}
    >
      <TextInput required value={name} onChange={handleNameChange} />
      <PhoneInput value={phone} onChange={handlePhoneChange} />
      <Button
        className={styles.button}
        disabled={consultationMutation.isPending || !name || !phone || phone.length <= 10}
      >
        {t("textButton")}
      </Button>
    </form>
  );
};

export default CommunicationForm;
