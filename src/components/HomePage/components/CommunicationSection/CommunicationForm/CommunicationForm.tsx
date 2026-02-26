"use client";

import { PhoneInput, TextInput, Button } from "@components/common";
import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { sendConsultation } from "@lib/api";
import Link from "next/link";
import { RoutesEnum } from "@types";

import styles from "./CommunicationForm.module.scss";

const CommunicationForm = () => {
  const local = useLocale();
  const t = useTranslations("CommunicationSection");
  const tServicePage = useTranslations("ServicePage");

  const [name, setName] = useState<string | null>("");
  const [phone, setPhone] = useState<string | null>("");
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  const handleNameChange = useCallback((value: string | null) => {
    setName(value ?? "");
  }, []);

  const handlePhoneChange = useCallback((value: string | null) => {
    setPhone(value ?? "");
  }, []);

  const consultationMutation = useMutation({
    mutationFn: (payload: { name: string; phone: string }) => sendConsultation(payload, local),
    onSuccess: () => {
      toast.success(tServicePage("successOrder"));
      setName("");
      setPhone("");
      setIsPrivacyAccepted(false);
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
        const nameWithLang = `${name} - language (${local})`;
        if (!name || !phone || phone.length <= 10 || !isPrivacyAccepted) return;
        consultationMutation.mutate({ name: nameWithLang, phone });
      }}
    >
      <TextInput required value={name} onChange={handleNameChange} />
      <PhoneInput value={phone} onChange={handlePhoneChange} />
      <label className={styles.consentLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isPrivacyAccepted}
          onChange={(event) => setIsPrivacyAccepted(event.target.checked)}
        />
        <span className={styles.consentText}>
          {local === "ro"
            ? "Sunt de acord cu prelucrarea datelor personale conform "
            : "Я согласен(а) с обработкой персональных данных в соответствии с "}
          <Link className={styles.policyLink} href={`/${local}${RoutesEnum.PrivacyPolicy}`}>
            {local === "ro" ? "Politicii de confidențialitate" : "Политикой конфиденциальности"}
          </Link>
        </span>
      </label>
      <Button
        className={styles.button}
        disabled={consultationMutation.isPending || !name || !phone || phone.length <= 10 || !isPrivacyAccepted}
      >
        {t("textButton")}
      </Button>
    </form>
  );
};

export default CommunicationForm;
