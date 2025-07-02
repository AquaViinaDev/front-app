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
  onAction?: () => void;
};

const Navbar = memo(({ links, onAction, className }: NavbarProps) => {
  return (
    <nav className={classNames(className, styles.nav)}>
      {links.map(({ label, href }) => (
        <Link key={href} href={href} onClick={() => (onAction ? onAction() : null)}>
          {label}
        </Link>
      ))}
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
