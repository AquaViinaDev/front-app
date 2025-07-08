"use client";

import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <div className={styles.title}>ГЛАВНЫЕ СТРАНИЦЫ</div>
          <Link className={styles.link} href="/">
            Главная
          </Link>
          <Link className={styles.link} href="/simple">
            Простые решения
          </Link>
          <Link className={styles.link} href="/advanced">
            Продвинутые решения
          </Link>
        </div>

        <div className={styles.column}>
          <div className={styles.title}>ПРОСТЫЕ РЕШЕНИЯ</div>
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
          <div className={styles.title}>ПРОДВИНУТЫЕ РЕШЕНИЯ</div>
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
