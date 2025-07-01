"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";
import classNames from "classnames";
import { memo } from "react";

export type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

const Navbar = memo(({ links, className }: NavbarProps) => {
  return (
    <nav className={classNames(className, styles.nav)}>
      {links.map(({ label, href }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
