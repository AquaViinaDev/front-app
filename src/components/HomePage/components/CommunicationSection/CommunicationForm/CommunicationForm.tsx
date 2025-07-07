"use client";

import styles from "./CommunicationForm.module.scss";
import { PhoneInput, TextInput, Button } from "@/components/common";
import { useCallback, useState } from "react";

const CommunicationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
        if (phone.length <= 10) return;
        console.log({ name: name, phone: phone });
      }}
    >
      <TextInput required value={name} onChange={handleNameChange} />
      <PhoneInput value={phone} onChange={handlePhoneChange} />
      <Button className={styles.button}>Отправить</Button>
    </form>
  );
};

export default CommunicationForm;
