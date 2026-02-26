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
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<{ name: boolean; phone: boolean; privacy: boolean }>({
    name: false,
    phone: false,
    privacy: false,
  });

  const mutationOrder = useMutation({
    mutationFn: (payload: { name: string; phone: string; orderName: string }) =>
      sendServiceOrder(payload, local),
    onSuccess: () => {
      toast.success(t("successOrder"));
      setUserName("");
      setPhoneNumber("");
      setSelectedService("");
      setIsPrivacyAccepted(false);
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
    const privacyError = !isPrivacyAccepted;

    setErrors({ name: nameError, phone: phoneError, privacy: privacyError });

    if (nameError || phoneError || privacyError || !selectedService) return;

    const payload = {
      name: `${userName} - язык (${local})`,
      phone: phoneNumber,
      orderName: selectedService,
    };

    mutationOrder.mutate(payload);
    setIsOpenModal(false);
  };

  const isLeadFormValid =
    Boolean(userName?.trim()) && Boolean(phoneNumber?.trim()) && phoneNumber.length > 10 && isPrivacyAccepted;

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
          price={500}
          icon="install"
          handleModal={() => handleOrder(t("osmosisInstallation.title"))}
        />
        <ServiceItem
          title={t("replacingCartridges.title")}
          description={t("replacingCartridges.description")}
          price={540}
          icon="replace"
          handleModal={() => handleOrder(t("replacingCartridges.title"))}
        />
        <ServiceItem
          title={t("repairFilters.title")}
          description={t("repairFilters.description")}
          price={300}
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
          privacyAccepted={isPrivacyAccepted}
          onPrivacyAcceptedChange={setIsPrivacyAccepted}
          submitDisabled={!isLeadFormValid || mutationOrder.isPending}
        />
      </Modal>
    </PageLayout>
  );
};
export default ServicesPage;
