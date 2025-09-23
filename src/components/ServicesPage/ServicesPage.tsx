"use client";

import { FormEvent, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ServiceItem } from "./ServiceItem";
import { useTranslations } from "use-intl";
import { Modal } from "../common/Modal";
import { Button, PhoneInput, TextInput } from "@/components/common";
import { useMutation } from "@tanstack/react-query";
import { sendConsultation } from "@/lib/api";
import { toast } from "react-toastify";

import styles from "./ServicesPage.module.scss";

const ServicesPage = () => {
  const t = useTranslations("ServicePage");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userName, setUserName] = useState<string | null>("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const consultationMutation = useMutation({
    mutationFn: sendConsultation,
    onSuccess: () => {
      toast.success("Заявка отправлена ✅");
      setUserName("");
      setPhoneNumber("");
    },
    onError: () => {
      toast.error("Ошибка отправки, попробуйте ещё раз");
    },
  });

  const handleOrder = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsOpenModal(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName || !phoneNumber || phoneNumber.length <= 10 || !selectedService) return;

    const payload = {
      name: userName,
      phone: phoneNumber,
      service: selectedService,
    };

    consultationMutation.mutate(payload);
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
        title={t("modalHeader")}
        bodyClassName={styles.bodyModal}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextInput
            textInputClassName={styles.nameInput}
            value={userName}
            onChange={(value) => setUserName(value)}
          />
          <PhoneInput value={phoneNumber} onChange={(e) => setPhoneNumber(e)} />
          <Button buttonType={"bigButton"}>{t("button")}</Button>
        </form>
      </Modal>
    </PageLayout>
  );
};
export default ServicesPage;
