"use client";

import Link from "next/link";
import styles from "./Footer.module.scss";
import { useTranslations } from "use-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <div className={styles.title}>{t("advancedPages.title")}</div>
          <Link className={styles.link} href="/">
            {t("advancedPages.main")}{" "}
          </Link>
          <Link className={styles.link} href="/simple">
            {t("advancedPages.simpleSolutions")}
          </Link>
          <Link className={styles.link} href="/advanced">
            {t("advancedPages.advancedSolutions")}
          </Link>
        </div>

        <div className={styles.column}>
          <div className={styles.title}>{t("simpleSolutions.title")}</div>
          <Link className={styles.link} href="/products/dafi-pitchers">
            DAFI (кувшины)
          </Link>
          <Link className={styles.link} href="/products/dafi-replaceables">
            DAFI (сменные элементы)
          </Link>
          <Link className={styles.link} href="/products/aquaphor-pitchers">
            АКВАФОР (кувшины)
          </Link>
          <Link className={styles.link} href="/products/aquaphor-replaceables">
            АКВАФОР (сменные элементы)
          </Link>
        </div>

        <div className={styles.column}>
          <div className={styles.title}>{t("advancedSolutions.title")}</div>
          <Link className={styles.link} href="/products/esli-filters">
            ESLI (фильтры)
          </Link>
          <Link className={styles.link} href="/products/esli-replaceables">
            ESLI (сменные элементы)
          </Link>
          <Link className={styles.link} href="/products/aquaphor-filters">
            АКВАФОР (фильтры)
          </Link>
          <Link className={styles.link} href="/products/aquaphor-replaceables">
            АКВАФОР (сменные элементы)
          </Link>
          <Link className={styles.link} href="/products/platinum-filters">
            PLATINUM WASSER (фильтры)
          </Link>
          <Link className={styles.link} href="/products/platinum-replaceables">
            PLATINUM WASSER (сменные элементы)
          </Link>
          <Link className={styles.link} href="/products/platinum-taps">
            PLATINUM WASSER (краны)
          </Link>
          <Link className={styles.link} href="/products/atlas-filters">
            ATLAS FILTRI (фильтры)
          </Link>
          <Link className={styles.link} href="/products/atlas-replaceables">
            ATLAS FILTRI (сменные элементы)
          </Link>
        </div>

        {/*<div className={styles.column}>*/}
        {/*  <div className={styles.title}>ДРУГОЕ</div>*/}
        {/*</div>*/}
      </div>
    </footer>
  );
};

export default Footer;
