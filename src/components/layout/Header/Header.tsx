"use client";

import Link from "next/link";
import { RoutesEnum } from "@/types";
import { Navbar } from "./components/NavBar";
import Social, { SocialData } from "./components/Social/Social";
import { Local } from "./components/Local";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "use-intl";
import { getNavLinks } from "@/components/layout/Header/utils";
import { Cart } from "../Header/components/Cart";

import styles from "./Header.module.scss";

const socialLinks: SocialData[] = [
  {
    image: "/instagram.svg",
    label: "Instagram",
    href: "https://www.instagram.com/aqua_viina/?next=%2F",
  },
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
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href={`/${locale}${RoutesEnum.Main}`} onClick={() => setIsOpen(false)}>
            {/*<Image src={"logo-icon.svg"} alt="Logo Aqua Viina" width={100} height={100} />*/}
            Aqua Viina
          </Link>
        </div>
        <div className={`${styles.additionalWrapper} ${isOpen ? styles.open : ""}`}>
          <Navbar className={styles.nav} links={navLinks} onAction={() => setIsOpen(false)} />
          <Social links={socialLinks} onAction={() => setIsOpen(false)} />
          <Cart className={styles.cart} />
          <Local />
        </div>
        <Cart className={styles.cartMobile} />
        <button className={styles.burger} onClick={() => setIsOpen(!isOpen)} aria-label="Menu open">
          <Image
            src={isOpen ? "/close.svg" : "/burger.svg"}
            alt={"Burger"}
            width={30}
            height={30}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
