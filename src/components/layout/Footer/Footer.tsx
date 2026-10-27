"use client";

import Link from "next/link";
import { useLocale } from "use-intl";
import { RoutesEnum } from "@types";
import {
  CATEGORIES,
  EMAIL,
  FOOTER,
  INSTAGRAM,
  NAV,
  PHONE,
  PHONE_HREF,
  WfLocale,
} from "@components/wf/content";

import styles from "./Footer.module.scss";

const Footer = () => {
  const locale = (useLocale() === "ro" ? "ro" : "ru") as WfLocale;
  const t = FOOTER[locale];
  const nav = NAV[locale];
  const year = new Date().getFullYear();
  const seoLanding =
    locale === "ro"
      ? { href: "/ro/filtre-apa-moldova", label: "Filtre de apă Moldova" }
      : { href: "/ru/filtry-dlya-vody-v-moldove", label: "Фильтры для воды в Молдове" };

  const info = [
    { label: nav.podbor, href: `/${locale}/podbor-filtra` },
    { label: nav.zamena, href: `/${locale}/zamena-kartridzhey` },
    { label: nav.services, href: `/${locale}${RoutesEnum.Services}` },
    { label: nav.promos, href: `/${locale}/promos` },
    { label: nav.articles, href: `/${locale}/articles` },
    { label: nav.about, href: `/${locale}${RoutesEnum.About}` },
    { label: t.warranty, href: `/${locale}/garantiya-i-vozvrat` },
    { label: nav.contacts, href: `/${locale}/contacts` },
    { label: seoLanding.label, href: seoLanding.href },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <p className={styles.logo}>AQUA VIINA</p>
          <p className={styles.about}>{t.about}</p>
          <a className={styles.phoneBig} href={PHONE_HREF}>
            {PHONE}
          </a>
          <a className={styles.social} href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>{t.catalog}</p>
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} className={styles.link} href={`/${locale}/types/${cat.slug}`}>
              {cat[locale].name}
            </Link>
          ))}
          <Link className={styles.link} href={`/${locale}${RoutesEnum.Products}`}>
            {nav.allProducts}
          </Link>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>{t.info}</p>
          {info.map((item) => (
            <Link key={item.href} className={styles.link} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>{t.contacts}</p>
          <p className={styles.label}>{t.phones}</p>
          <a className={styles.value} href={PHONE_HREF}>
            {PHONE}
          </a>
          <p className={styles.label}>{t.email}</p>
          <a className={styles.value} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <p className={styles.label}>{t.hours}</p>
          <p className={styles.value}>{t.hoursValue}</p>
          <p className={styles.label}>{locale === "ro" ? "Adresa" : "Адрес"}</p>
          <p className={styles.value}>{t.city}</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>
            © {year} Aqua Viina. {t.rights}
          </span>
          <Link className={styles.bottomLink} href={`/${locale}${RoutesEnum.PrivacyPolicy}`}>
            {t.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
