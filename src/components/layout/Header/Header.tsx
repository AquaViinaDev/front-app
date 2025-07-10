"use client";

import Link from "next/link";
import { RoutesEnum } from "@/types";
import { Navbar, NavLink } from "./components/NavBar";
import Social, { SocialData } from "./components/Social/Social";
import { Local } from "./components/Local";
// import { SearchForm } from "@/components/common/SearchForm";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Header.module.scss";
import { useLocale, useTranslations } from "use-intl";
import { getNavLinks } from "@/components/layout/Header/utils";

// const navLinks: NavLink[] = [
//   { label: "Товары", href: RoutesEnum.Products },
//   { label: "Услуги", href: RoutesEnum.Services },
//   { label: "Контакты", href: RoutesEnum.Contacts },
//   { label: "О нас", href: RoutesEnum.About },
// ];

const socialLinks: SocialData[] = [
  { image: "./telegram.svg", label: "Telegram", href: RoutesEnum.Products },
  { image: "./instagram.svg", label: "Instagram", href: RoutesEnum.Services },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const navLinks = getNavLinks(t, locale);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={RoutesEnum.Main} onClick={() => setIsOpen(false)}>
          AQUA VIINA
        </Link>
      </div>
      <div className={`${styles.additionalWrapper} ${isOpen ? styles.open : ""}`}>
        {/*<SearchForm />*/}
        <Navbar className={styles.nav} links={navLinks} onAction={() => setIsOpen(false)} />
        <Social links={socialLinks} onAction={() => setIsOpen(false)} />
        <Local />
      </div>
      <button className={styles.burger} onClick={() => setIsOpen(!isOpen)} aria-label="Menu open">
        <Image src={isOpen ? "/close.svg" : "/burger.svg"} alt={"Burger"} width={30} height={30} />
      </button>
    </header>
  );
};

export default Header;
