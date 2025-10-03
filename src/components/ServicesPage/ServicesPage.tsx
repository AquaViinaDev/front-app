"use client";

import { FormEvent, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ServiceItem } from "./ServiceItem";
import { useLocale, useTranslations } from "use-intl";
import { Modal } from "../common/Modal";
import { Button, PhoneInput, TextInput } from "@/components/common";
import { useMutation } from "@tanstack/react-query";
import { sendServiceOrder } from "@/lib/api";
import { toast } from "react-toastify";

import styles from "./ServicesPage.module.scss";

const ServicesPage = () => {
  const local = useLocale();
  const t = useTranslations("ServicePage");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [errors, setErrors] = useState<{ name: boolean; phone: boolean }>({
    name: false,
    phone: false,
  });

  const mutationOrder = useMutation({
    mutationFn: sendServiceOrder,
    onSuccess: () => {
      toast.success(t("successOrder"));
      setUserName("");
      setPhoneNumber("");
      setSelectedService("");
      setIsOpenModal(false);
    },
    onError: () => {
      toast.error(t("errorOrder"));
    },
  });

  const handleOrder = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsOpenModal(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nameError = !userName?.trim();
    const phoneError = !phoneNumber?.trim() || phoneNumber.length <= 10;

    setErrors({ name: nameError, phone: phoneError });

    if (nameError || phoneError || !selectedService) return;

    const payload = {
      name: `${userName} - язык (${local})`,
      phone: phoneNumber,
      orderName: selectedService,
    };

    mutationOrder.mutate(payload);
    setIsOpenModal(false);
  };

  return (
    <PageLayout>
      <h1 className={styles.title}>{t("title")}</h1>
      <ul className={styles.root}>
        <ServiceItem
          title={t("osmosisInstallation.title")}
          description={t("osmosisInstallation.description")}
          price={400}
          handleModal={() => handleOrder(t("osmosisInstallation.title"))}
        />
        <ServiceItem
          title={t("replacingCartridges.title")}
          description={t("replacingCartridges.description")}
          price={650}
          handleModal={() => handleOrder(t("replacingCartridges.title"))}
        />
        <ServiceItem
          title={t("repairFilters.title")}
          description={t("repairFilters.description")}
          price={250}
          handleModal={() => handleOrder(t("repairFilters.title"))}
        />
      </ul>
      <Modal
        onClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        title={`${t("modalHeader")}${selectedService}`}
        bodyClassName={styles.bodyModal}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextInput
            textInputClassName={styles.nameInput}
            value={userName}
            onChange={(value) => setUserName(value ?? "")}
            error={errors.name}
          />
          <PhoneInput
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e ?? "")}
            error={errors.phone}
          />
          <Button buttonType={"bigButton"}>{t("button")}</Button>
        </form>
      </Modal>
    </PageLayout>
  );
};
export default ServicesPage;
