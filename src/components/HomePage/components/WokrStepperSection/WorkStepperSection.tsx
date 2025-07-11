import { WorkSteppItem } from "./WorkSteppItem";

import { useTranslations } from "use-intl";

import styles from "./WorkStepperSection.module.scss";

const WorkStepperSection = () => {
  const t = useTranslations("WorkStepperSection");

  return (
    <section className={styles.root}>
      <div className={styles.descriptionWrapper}>
        <h3 className={styles.title}>🔧 {t("title")}</h3>
        <h4 className={styles.subtitle}>{t("subtitle")}</h4>
      </div>
      <ul className={styles.stepWrapper}>
        <WorkSteppItem stepNumber={1} description={t("firstStep.description")}>
          📩 {t("firstStep.title")}
        </WorkSteppItem>
        <WorkSteppItem stepNumber={2} description={t("secondStep.description")}>
          📞 {t("secondStep.title")}
        </WorkSteppItem>
        <WorkSteppItem stepNumber={3} description={t("thirdStep.description")}>
          🚚 {t("thirdStep.title")}
        </WorkSteppItem>
        <WorkSteppItem stepNumber={4} description={t("fourthStep.description")}>
          🛠️ {t("fourthStep.title")}
        </WorkSteppItem>
        <WorkSteppItem stepNumber={5} description={t("fifthStep.description")}>
          🔁 {t("fifthStep.title")}
        </WorkSteppItem>
      </ul>
    </section>
  );
};

export default WorkStepperSection;
