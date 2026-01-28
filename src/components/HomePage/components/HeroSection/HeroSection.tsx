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
  const statLeftTitle = t("MainSection.statLeftTitle");
  const statLeftSubtitle = t("MainSection.statLeftSubtitle");
  const statRightTitle = t("MainSection.statRightTitle");
  const statRightSubtitle = t("MainSection.statRightSubtitle");
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
              <Button className={styles.primaryButton} onClick={onConsultClick}>
                {t("MainSection.textButton")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.arrowIcon}
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
              {/* <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => setIsVideoOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.playIcon}
                  aria-hidden="true"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
                {t("MainSection.textButtonSecondary")}
              </button> */}
            </div>
            <div className={styles.features}>
              {features.map((feature) => (
                <div key={feature} className={styles.featureItem}>
                  <span className={styles.featureIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.checkIcon}
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.media}>
            <div className={styles.mediaCard}>
              <Image
                src="/images/home-image.jpg"
                alt="AquaPure Filter"
                width={640}
                height={480}
                className={styles.mediaImage}
                priority
              />
              <div className={styles.statCardLeft}>
                <div className={styles.statIconCyan}>
                  <span>99%</span>
                </div>
                <div>
                  <p className={styles.statTitle}>{statLeftTitle}</p>
                  <p className={styles.statSubtitle}>{statLeftSubtitle}</p>
                </div>
              </div>
              <div className={styles.statCardRight}>
                <div className={styles.statIconBlue}>
                  <span>50K+</span>
                </div>
                <div>
                  <p className={styles.statTitle}>{statRightTitle}</p>
                  <p className={styles.statSubtitle}>{statRightSubtitle}</p>
                </div>
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
