"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import Link from "next/link";
import { RoutesEnum } from "@types";
import Image from "next/image";

import styles from "./Footer.module.scss";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const [logoClicks, setLogoClicks] = useState(0);
  const [showCreators, setShowCreators] = useState(false);

  useEffect(() => {
    if (!logoClicks) return;

    const timer = setTimeout(() => {
      setLogoClicks(0);
    }, 1600);

    return () => clearTimeout(timer);
  }, [logoClicks]);

  const handleLogoSecret = () => {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowCreators((current) => !current);
        return 0;
      }
      return next;
    });
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandBlock}>
          <h2
            className={styles.logo}
            role="button"
            tabIndex={0}
            onClick={handleLogoSecret}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleLogoSecret();
              }
            }}
            aria-label="Aqua Viina secret"
          >
            AQUA VIINA
          </h2>
          <p className={styles.description}>{t("mainText")}</p>
          <p className={`${styles.easterEgg} ${showCreators ? styles.easterEggVisible : ""}`}>
            Created by Cavliuc Igor &amp; Bondarenco Nicolai
          </p>
          <div className={styles.socialRow}>
            <Link
              href="https://www.instagram.com/aqua_viina/?next=%2F"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <Image src={"/instagram.svg"} alt={"Instagram"} width={20} height={20} />
              Instagram
            </Link>
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>{t("navigation.title")}</h3>
          <ul className={styles.navList}>
            <li>
              <Link href={`/${locale}${RoutesEnum.Main}`} className={styles.link}>
                {t("navigation.main")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${RoutesEnum.Products}`} className={styles.link}>
                {t("navigation.products")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${RoutesEnum.Services}`} className={styles.link}>
                {t("navigation.services")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${RoutesEnum.About}`} className={styles.link}>
                {t("navigation.aboutUs")}
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>{t("contacts.title")}</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t("contacts.phoneLabel")}</span>
              <Link href="tel:+37367177889" className={styles.link}>
                {t("contacts.phoneValue")}
              </Link>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t("contacts.emailLabel")}</span>
              <Link href={`mailto:${t("contacts.emailValue")}`} className={styles.link}>
                {t("contacts.emailValue")}
              </Link>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t("contacts.addressLabel")}</span>
              <span className={styles.contactText}>{t("contacts.location")}</span>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>{t("support.title")}</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t("support.hoursLabel")}</span>
              <span className={styles.contactText}>{t("support.hoursValue")}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t("support.deliveryLabel")}</span>
              <span className={styles.contactText}>{t("support.deliveryValue")}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t("support.consultationLabel")}</span>
              <span className={styles.contactText}>{t("support.consultationValue")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        © {currentYear} AQUA VIINA. {t("copyright")}
      </div>
    </footer>
  );
};

export default Footer;
