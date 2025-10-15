"use client";

import { useLocale, useTranslations } from "use-intl";
import Link from "next/link";
import { RoutesEnum } from "@types";
import Image from "next/image";

import styles from "./Footer.module.scss";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.logo}>AQUA VIINA</h2>
          <p className={styles.description}>{t("mainText")}</p>
        </div>
        <div>
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
        <div>
          <h3 className={styles.title}>{t("contacts.title")}</h3>
          <p className={styles.contact}>
            📞
            <Link href="tel:+373 67 177 889" className={styles.link}>
              +373 67 177 889
            </Link>
          </p>
          <p className={styles.contact}>
            <Link
              href="https://www.instagram.com/aqua_viina/?next=%2F"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramLink}
            >
              <Image
                src={"/instagram.svg"}
                alt={"Instagram-logo"}
                width={20}
                height={20}
                className={styles.logo}
              />
              Aqua Viina
            </Link>
          </p>
          <p className={styles.contact}>📍 {t("contacts.location")}</p>
        </div>
      </div>
      <div className={styles.bottomBar}>© 2025 AQUA VIINA. Все права защищены.</div>
    </footer>
  );
};

export default Footer;
