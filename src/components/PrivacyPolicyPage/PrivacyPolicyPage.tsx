"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { useTranslations } from "use-intl";

import styles from "./PrivacyPolicyPage.module.scss";

const PrivacyPolicyPage = () => {
  const t = useTranslations("PrivacyPolicyPage");

  const sectionKeys = [
    "general",
    "operator",
    "dataCollected",
    "processingPurposes",
    "legalBasis",
    "consentWording",
    "thirdPartyTransfer",
    "retentionPeriods",
    "userRights",
    "securityMeasures",
    "cookies",
    "policyChanges",
  ] as const;

  return (
    <PageLayout className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.intro}>
          {t("effectiveDateLabel")}: {t("effectiveDate")}
        </p>
        <div className={styles.sections}>
          {sectionKeys.map((sectionKey, index) => (
            <section key={sectionKey} className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {index + 1}. {t(`sections.${sectionKey}.title`)}
              </h2>
              <p className={styles.text}>{t(`sections.${sectionKey}.text`)}</p>
            </section>
          ))}
        </div>
        <p className={styles.text}>{t("copyright")}</p>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
