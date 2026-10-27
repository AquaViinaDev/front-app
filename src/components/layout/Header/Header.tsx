"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useLocale } from "use-intl";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "@types";
import { Modal } from "@components/common";
import { CommunicationForm } from "@components/HomePage/components/CommunicationSection/CommunicationForm";
import { CATEGORIES, NAV, PHONE, PHONE_HREF, WfLocale } from "@components/wf/content";
import { Cart } from "./components/Cart";
import { Local } from "./components/Local";

import styles from "./Header.module.scss";

const Header = () => {
  const locale = (useLocale() === "ro" ? "ro" : "ru") as WfLocale;
  const router = useRouter();
  const t = NAV[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setIsCatalogOpen(false);
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    router.push(
      value
        ? `/${locale}${RoutesEnum.Products}?query=${encodeURIComponent(value)}`
        : `/${locale}${RoutesEnum.Products}`
    );
    close();
  };

  const links = [
    { label: t.podbor, href: `/${locale}/podbor-filtra` },
    { label: t.zamena, href: `/${locale}/zamena-kartridzhey` },
    { label: t.services, href: `/${locale}${RoutesEnum.Services}` },
    { label: t.promos, href: `/${locale}/promos` },
    { label: t.articles, href: `/${locale}/articles` },
    { label: t.about, href: `/${locale}${RoutesEnum.About}` },
    { label: t.contacts, href: `/${locale}/contacts` },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.inner}>
          <span className={styles.topNote}>{t.topNote}</span>
          <a className={styles.topPhone} href={PHONE_HREF}>
            {PHONE}
          </a>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.inner}>
          <Link
            href={`/${locale}${RoutesEnum.Main}`}
            className={styles.brand}
            aria-label="Aqua Viina"
            onClick={close}
          >
            <Image src="/logo.svg" alt="" width={130} height={44} aria-hidden="true" priority />
            <span className={styles.brandNote}>{t.brandNote}</span>
          </Link>

          <form className={styles.search} onSubmit={onSearch} role="search">
            <input
              className={styles.searchInput}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={locale === "ro" ? "Caută filtru sau cartuș" : "Поиск фильтра или картриджа"}
              aria-label={t.search}
            />
            <button className={styles.searchBtn} type="submit">
              {t.search}
            </button>
          </form>

          <div className={styles.actions}>
            <a className={styles.phone} href={PHONE_HREF}>
              {PHONE}
            </a>
            <button
              type="button"
              className={styles.callback}
              onClick={() => setIsCallbackOpen(true)}
            >
              {t.callback}
            </button>
            <Suspense fallback={null}>
              <Local />
            </Suspense>
            <Cart className={styles.cart} />
            <button
              type="button"
              className={styles.burger}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="wf-mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Main">
        <div className={styles.inner}>
          <div
            className={styles.dropdown}
            onMouseEnter={() => setIsCatalogOpen(true)}
            onMouseLeave={() => setIsCatalogOpen(false)}
          >
            <button
              type="button"
              className={styles.catalogBtn}
              aria-expanded={isCatalogOpen}
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            >
              ☰ {t.catalog}
            </button>
            {isCatalogOpen && (
              <div className={styles.dropdownMenu}>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${locale}/types/${cat.slug}`}
                    className={styles.dropdownItem}
                    onClick={close}
                  >
                    <span aria-hidden="true">{cat.icon}</span> {cat[locale].name}
                  </Link>
                ))}
                <Link
                  href={`/${locale}${RoutesEnum.Products}`}
                  className={styles.dropdownAll}
                  onClick={close}
                >
                  {t.allProducts} →
                </Link>
              </div>
            )}
          </div>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <div
        id="wf-mobile-menu"
        className={`${styles.mobile} ${isOpen ? styles.mobileOpen : ""}`}
      >
        <form className={styles.mobileSearch} onSubmit={onSearch} role="search">
          <input
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={locale === "ro" ? "Caută filtru" : "Поиск фильтра"}
            aria-label={t.search}
          />
          <button className={styles.searchBtn} type="submit">
            {t.search}
          </button>
        </form>
        <p className={styles.mobileHeading}>{t.catalog}</p>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${locale}/types/${cat.slug}`}
            className={styles.mobileLink}
            onClick={close}
          >
            <span aria-hidden="true">{cat.icon}</span> {cat[locale].name}
          </Link>
        ))}
        <Link href={`/${locale}${RoutesEnum.Products}`} className={styles.mobileLink} onClick={close}>
          {t.allProducts}
        </Link>
        <p className={styles.mobileHeading}>Aqua Viina</p>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={styles.mobileLink} onClick={close}>
            {link.label}
          </Link>
        ))}
        <a className={styles.mobilePhone} href={PHONE_HREF}>
          {PHONE}
        </a>
        <button
          type="button"
          className={styles.callbackWide}
          onClick={() => {
            close();
            setIsCallbackOpen(true);
          }}
        >
          {t.callback}
        </button>
      </div>

      <Modal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        title={
          locale === "ro"
            ? "Lasă datele — te sunăm înapoi"
            : "Оставьте контакты — мы перезвоним"
        }
      >
        <CommunicationForm />
      </Modal>
    </header>
  );
};

export default Header;
