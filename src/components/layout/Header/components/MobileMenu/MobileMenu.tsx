"use client";

import Link from "next/link";
import { NavLink } from "../NavBar";
import { SocialData } from "../Social/Social";
import Image from "next/image";

import styles from "./MobileMenu.module.scss";

type Props = {
  links: NavLink[];
  social: SocialData[];
  onClose: () => void;
};

const MobileMenu = ({ links, social, onClose }: Props) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <nav className={styles.nav}>
          {links.map(({ label, href }) => (
            <Link key={href} href={href} onClick={onClose}>
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.social}>
          {social.map(({ label, image, href }) => (
            <Link key={href} href={href} onClick={onClose}>
              <Image src={image} alt={label} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
