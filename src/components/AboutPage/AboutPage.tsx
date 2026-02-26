"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { useLocale, useTranslations } from "use-intl";
import { Button, LeadForm, Modal } from "@components/common";
import { FormEvent, useState } from "react";
import { sendConsultation } from "@lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";
import { RoutesEnum } from "@types";
import { ShortInfoBlockItem } from "@components/AboutPage/components";

import styles from "./AboutPage.module.scss";

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  const tServicePage = useTranslations("ServicePage");
  const local = useLocale();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<{ name: boolean; phone: boolean; privacy: boolean }>({
    name: false,
    phone: false,
    privacy: false,
  });

  const points = [
    t("WhyChooseUs.textFirstLine"),
    t("WhyChooseUs.textSecondLine"),
    t("WhyChooseUs.textThirdLine"),
    t("WhyChooseUs.textFourthLine"),
  ];

  const { mutate: sendConsultationMutate } = useMutation({
    mutationFn: (payload: { name: string; phone: string }) => sendConsultation(payload, local),
    onSuccess: () => {
      setIsOpenModal(false);
      toast.success(tServicePage("successOrder"));
      setUserName("");
      setPhoneNumber("");
      setIsPrivacyAccepted(false);
    },
    onError: () => {
      toast.error(tServicePage("errorOrder"));
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nameError = !userName?.trim();
    const phoneError = !phoneNumber?.trim() || phoneNumber.length <= 10;
    const privacyError = !isPrivacyAccepted;

    setErrors({ name: nameError, phone: phoneError, privacy: privacyError });

    if (nameError || phoneError || privacyError) return;

    const payload = {
      name: `${userName} - язык (${local})`,
      phone: phoneNumber,
    };

    sendConsultationMutate(payload);
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
        <div className={styles.grid}>
          <div className={styles.left}>
            {/* <span className={styles.badge}>{t("WhoWeAre.title")}</span> */}
            <h2 className={styles.heading}>{t("title")}</h2>
            <div className={styles.paragraphs}>
              <p>{t("WhoWeAre.text")}</p>
              <p>{t("OurExpertise.text")}</p>
              <p>{t("OurPromise.text")}</p>
            </div>
            <div className={styles.points}>
              {points.map((point) => (
                <div key={point} className={styles.pointItem}>
                  <span className={styles.pointIcon}>✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className={styles.callout}>
              <p>{t("CallToAction.text")}</p>
              <Button  className={styles.button} onClick={() => setIsOpenModal(true)}>{t("textButton")}</Button>
            </div>
          </div>
          <div className={styles.statsGrid}>
            <ShortInfoBlockItem
              className={styles.statCard}
              image={"/delivery-truck.svg"}
              text={t("ShortInfoBlockItem.delivery")}
            />
            <ShortInfoBlockItem
              className={styles.statCard}
              image={"/return-icon.svg"}
              text={t("ShortInfoBlockItem.guarantee")}
            />
            <ShortInfoBlockItem
              className={styles.statCard}
              onClick={() => setIsOpenModal(true)}
              image={"/headphones-icon.svg"}
              text={t("ShortInfoBlockItem.support")}
            />
            <ShortInfoBlockItem
              className={styles.statCard}
              as={Link}
              href={`/${local}${RoutesEnum.Products}`}
              image={"/cart-icon.svg"}
              text={t("ShortInfoBlockItem.wideSelection")}
            />
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        title={t("modalTitle")}
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
          submitLabel={t("sendButton")}
          privacyAccepted={isPrivacyAccepted}
          onPrivacyAcceptedChange={setIsPrivacyAccepted}
          submitDisabled={!isLeadFormValid}
        />
      </Modal>
    </PageLayout>
  );
};

export default AboutPage;
