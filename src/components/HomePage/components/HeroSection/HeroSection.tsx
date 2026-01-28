import styles from "./HeroSection.module.scss";
import { memo, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import Image from "next/image";
import { Button } from "@components/common/Button";
import { Modal } from "@components/common/Modal";
import Link from "next/link";
import { RoutesEnum } from "@types";

type HeroSectionProps = {
  onConsultClick: () => void;
};

const HeroSection = memo(({ onConsultClick }: HeroSectionProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const features = [
    t("MainSection.featureInstall"),
    t("MainSection.featureWarranty"),
    t("MainSection.featureService"),
  ];
  return (
    <section className={styles.root}>
      <div className={styles.decor}>
        <span className={styles.glowOne} />
        <span className={styles.glowTwo} />
        <span className={styles.glowRadial} />
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span className={styles.badgeText}>{t("MainSection.badge")}</span>
            </div>
            <h1 className={styles.title}>
              {t("MainSection.title")}
              <span className={styles.titleAccent}>{t("MainSection.titleAccent")}</span>
            </h1>
            <p className={styles.subtitle}>{t("MainSection.subtitle")}</p>
            <div className={styles.actions}>
              <Button className={styles.button} onClick={onConsultClick}>
                {t("MainSection.textButton")}
              </Button>
              {/* <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setIsVideoOpen(true)}
              >
                {t("MainSection.textButtonSecondary")}
              </button> */}
            </div>
            <div className={styles.features}>
              {features.map((feature) => (
                <div key={feature} className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.media}>
            <div className={styles.mediaCard}>
              <div className={styles.mediaImage}>
                <Image
                  src="/images/home-image.jpg"
                  alt="Water filters"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 520px"
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.ring} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={t("MainSection.videoTitle")}
      >
        <div className={styles.videoPlaceholder}>
          <p>{t("MainSection.videoPlaceholder")}</p>
          <Link className={styles.videoLink} href={`/${locale}${RoutesEnum.Products}`}>
            {t("MainSection.videoCta")}
          </Link>
        </div>
      </Modal>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
