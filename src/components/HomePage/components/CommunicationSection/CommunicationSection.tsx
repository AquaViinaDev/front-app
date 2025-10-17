"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { CommunicationForm } from "./CommunicationForm";
import { useTranslations } from "use-intl";

import styles from "./CommunicationSection.module.scss";

const CommunicationSection = forwardRef<HTMLElement>((_, ref) => {
  const t = useTranslations("CommunicationSection");

  return (
    <section ref={ref} className={styles.root}>
      <Image
        src="/images/communication.png"
        alt="Communication image"
        width={500}
        height={500}
        className={styles.image}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("description")}</p>
        <div className={styles.formWrapper}>
          <CommunicationForm />
        </div>
      </div>
    </section>
  );
});

CommunicationSection.displayName = "CommunicationSection";

export default CommunicationSection;
