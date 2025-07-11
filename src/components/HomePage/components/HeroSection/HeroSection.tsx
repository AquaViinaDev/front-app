import Image from "next/image";
import { Button } from "@/components/common/Button";

import styles from "./HeroSection.module.scss";
import { memo } from "react";
import { useTranslations } from "use-intl";

type HeroSectionProps = {
  onConsultClick: () => void;
};

const HeroSection = memo(({ onConsultClick }: HeroSectionProps) => {
  const t = useTranslations();
  return (
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <Image
          src="/images/home-image.jpg"
          alt="Water filters"
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay}>
          <h1 className={styles.title}>{t("MainSection.title")}</h1>
          <p className={styles.subtitle}>{t("MainSection.subtitle")}</p>
          <Button className={styles.button} onClick={onConsultClick}>
            {t("MainSection.textButton")}
          </Button>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
