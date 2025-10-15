"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { useLocale, useTranslations } from "use-intl";
import { AboutDescriptionItem, ShortInfoBlockItem } from "@components/AboutPage/components";
import { Button, LeadForm, Modal } from "@components/common";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { RoutesEnum } from "@types";
import { sendConsultation } from "@lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import styles from "./AboutPage.module.scss";

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  const tServicePage = useTranslations("ServicePage");
  const local = useLocale();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<{ name: boolean; phone: boolean }>({
    name: false,
    phone: false,
  });

  const { mutate: sendConsultationMutate } = useMutation({
    mutationFn: (payload: { name: string; phone: string }) => sendConsultation(payload, local),
    onSuccess: () => {
      setIsOpenModal(false);
      toast.success(tServicePage("successOrder"));
      setUserName("");
      setPhoneNumber("");
    },
    onError: () => {
      toast.error(tServicePage("errorOrder"));
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nameError = !userName?.trim();
    const phoneError = !phoneNumber?.trim() || phoneNumber.length <= 10;

    setErrors({ name: nameError, phone: phoneError });

    if (nameError || phoneError) return;

    const payload = {
      name: `${userName} - язык (${local})`,
      phone: phoneNumber,
    };

    sendConsultationMutate(payload);
    setIsOpenModal(false);
  };

  return (
    <PageLayout contentClassName={styles.content}>
      <h1 className={styles.title}>{t("title")}</h1>
      <ul className={styles.description}>
        <AboutDescriptionItem title={t("WhoWeAre.title")}>
          <p className={styles.text}>{t("WhoWeAre.text")}</p>
        </AboutDescriptionItem>
        <AboutDescriptionItem title={t("WhyChooseUs.title")}>
          <div className={styles.contentItemWrapper}>
            <p className={styles.text}>{t("WhyChooseUs.textFirstLine")}</p>
            <p className={styles.text}>{t("WhyChooseUs.textSecondLine")}</p>
            <p className={styles.text}>{t("WhyChooseUs.textThirdLine")}</p>
            <p className={styles.text}>{t("WhyChooseUs.textFourthLine")}</p>
          </div>
        </AboutDescriptionItem>
        <AboutDescriptionItem title={t("OurExpertise.title")}>
          <p className={styles.text}>{t("OurExpertise.text")}</p>
        </AboutDescriptionItem>
        <AboutDescriptionItem title={t("OurPromise.title")}>
          <p className={styles.text}>{t("OurPromise.text")}</p>
        </AboutDescriptionItem>
        <AboutDescriptionItem title={t("CallToAction.title")}>
          <p className={styles.text}>{t("CallToAction.text")}</p>
        </AboutDescriptionItem>
      </ul>
      <Button onClick={() => setIsOpenModal(true)}>{t("textButton")}</Button>
      <ul className={styles.shortInfoBlock}>
        <ShortInfoBlockItem image={"/delivery-truck.svg"} text={t("ShortInfoBlockItem.delivery")} />
        <ShortInfoBlockItem image={"/return-icon.svg"} text={t("ShortInfoBlockItem.guarantee")} />
        <ShortInfoBlockItem
          onClick={() => setIsOpenModal(true)}
          image={"/headphones-icon.svg"}
          text={t("ShortInfoBlockItem.support")}
        />
        <ShortInfoBlockItem
          as={Link}
          href={`/${local}${RoutesEnum.Products}`}
          image={"/cart-icon.svg"}
          text={t("ShortInfoBlockItem.wideSelection")}
        />
      </ul>
      <Modal
        onClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        title={t("modalTitle")}
        bodyClassName={styles.bodyModal}
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
        />
      </Modal>
    </PageLayout>
  );
};
export default AboutPage;
