"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { RoutesEnum } from "@/types";
import { Navbar, NavLink } from "./components/NavBar";
import Social, { SocialData } from "./components/Social/Social";
import { Local } from "./components/Local";
import { SearchForm } from "@/components/common/SearchForm";

const navLinks: NavLink[] = [
  { label: "Товары", href: RoutesEnum.Products },
  { label: "Услуги", href: RoutesEnum.Services },
  { label: "Контакты", href: RoutesEnum.Contacts },
  { label: "О нас", href: RoutesEnum.About },
];

const socialLinks: SocialData[] = [
  { image: "./telegram.svg", label: "Telegram", href: RoutesEnum.Products },
  { image: "./instagram.svg", label: "Instagram", href: RoutesEnum.Services },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={RoutesEnum.Main}>AQUA VIINA</Link>
      </div>
      <div className={styles.additionalWrapper}>
        <SearchForm />
        <Navbar className={styles.nav} links={navLinks} />
        <Social links={socialLinks} />
        <Local />
      </div>
    </header>
  );
};

export default Header;
