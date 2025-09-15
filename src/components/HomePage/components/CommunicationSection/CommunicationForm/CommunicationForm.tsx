"use client";

import { PhoneInput, TextInput, Button } from "@/components/common";
import { useCallback, useState } from "react";
import { useTranslations } from "use-intl";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { sendConsultation } from "@/lib/api";

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

  const consultationMutation = useMutation({
    mutationFn: sendConsultation,
    onSuccess: () => {
      toast.success("Заявка отправлена ✅");
      setName("");
      setPhone("");
    },
    onError: () => {
      toast.error("Ошибка отправки, попробуйте ещё раз");
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!name || !phone || phone.length <= 10) return;
        consultationMutation.mutate({ name, phone });
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
