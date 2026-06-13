"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { useLocale, useTranslations } from "use-intl";
import { Button, CartIcon, LeadForm, Modal } from "@components/common";
import { FormEvent, useState } from "react";
import { sendConsultation } from "@lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";
import { RoutesEnum } from "@types";
import { ShortInfoBlockItem } from "@components/AboutPage/components";

import styles from "./AboutPage.module.scss";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const DeliveryIcon = () => (
  <svg {...iconProps}>
    <path d="M3 7h11v10H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <path d="M5 17a2 2 0 1 0 4 0" />
    <path d="M16 17a2 2 0 1 0 4 0" />
    <path d="M7 7V5h4v2" />
  </svg>
);

const ReturnIcon = () => (
  <svg {...iconProps}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-4" />
  </svg>
);

const SupportIcon = () => (
  <svg {...iconProps}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h3z" />
    <path d="M3 13h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

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
              icon={<DeliveryIcon />}
              text={t("ShortInfoBlockItem.delivery")}
            />
            <ShortInfoBlockItem
              className={styles.statCard}
              icon={<ReturnIcon />}
              text={t("ShortInfoBlockItem.guarantee")}
            />
            <ShortInfoBlockItem
              className={styles.statCard}
              onClick={() => setIsOpenModal(true)}
              icon={<SupportIcon />}
              text={t("ShortInfoBlockItem.support")}
            />
            <ShortInfoBlockItem
              className={styles.statCard}
              as={Link}
              href={`/${local}${RoutesEnum.Products}`}
              icon={<CartIcon />}
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
