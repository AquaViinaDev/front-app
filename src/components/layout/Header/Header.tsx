"use client";

import Link from "next/link";
import { RoutesEnum } from "@/types";
import { Navbar, NavLink } from "./components/NavBar";
import Social, { SocialData } from "./components/Social/Social";
import { Local } from "./components/Local";
// import { SearchForm } from "@/components/common/SearchForm";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./Header.module.scss";

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
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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
      <div ref={wrapperRef} className={`${styles.additionalWrapper} ${isOpen ? styles.open : ""}`}>
        {/*<SearchForm />*/}
        <Navbar className={styles.nav} links={navLinks} onAction={() => setIsOpen(false)} />
        <Social links={socialLinks} onAction={() => setIsOpen(false)} />
        <Local />
      </div>
      <button className={styles.burger} onClick={() => setIsOpen(!isOpen)} aria-label="Menu open">
        <Image src={isOpen ? "/close.svg" : "/burger.svg"} alt={"Bureger"} width={30} height={30} />
      </button>
    </header>
  );
};

export default Header;
