"use client";

import { FormEvent, useState } from "react";
import { PageLayout } from "@components/layout/PageLayout";
import { ServiceItem } from "@components/ServicesPage/ServiceItem";
import { useLocale, useTranslations } from "use-intl";
import { LeadForm, Modal } from "@components/common";
import { useMutation } from "@tanstack/react-query";
import { sendServiceOrder } from "@lib/api";
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
    mutationFn: (payload: { name: string; phone: string; orderName: string }) =>
      sendServiceOrder(payload, local),
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
    <PageLayout
      className={styles.pageRoot}
      wrapperClassName={styles.pageWrapper}
      contentClassName={styles.content}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("title")}</h1>
        </div>
        <ul className={styles.root}>
        <ServiceItem
          title={t("osmosisInstallation.title")}
          description={t("osmosisInstallation.description")}
          price={400}
          icon="install"
          handleModal={() => handleOrder(t("osmosisInstallation.title"))}
        />
        <ServiceItem
          title={t("replacingCartridges.title")}
          description={t("replacingCartridges.description")}
          price={650}
          icon="replace"
          handleModal={() => handleOrder(t("replacingCartridges.title"))}
        />
        <ServiceItem
          title={t("repairFilters.title")}
          description={t("repairFilters.description")}
          price={250}
          icon="repair"
          handleModal={() => handleOrder(t("repairFilters.title"))}
        />
        </ul>
      </div>
      <Modal
        onClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        title={`${t("modalHeader")}${selectedService}`}
        bodyClassName={styles.bodyModal}
        headerClassName={styles.headerModal}
      >
        <LeadForm
          formClassName={styles.form}
          nameInputClassName={styles.nameInput}
          name={userName}
          phone={phoneNumber}
          errors={errors}
          onNameChange={setUserName}
          onPhoneChange={setPhoneNumber}
          onSubmit={handleSubmit}
          submitLabel={t("button")}
        />
      </Modal>
    </PageLayout>
  );
};
export default ServicesPage;
