"use client";

import Link from "next/link";
import styles from "./Social.module.scss";
import classNames from "classnames";
import { memo } from "react";
import Image from "next/image";

export type SocialData = {
  image: string;
  label: string;
  href: string;
};

type SocialProps = {
  links: SocialData[];
  className?: string;
  onAction?: () => void;
};

const Social = memo(({ links, className, onAction }: SocialProps) => {
  return (
    <nav className={classNames(className, styles.nav)}>
      {links.map(({ image, label, href }) => {
        const isExternal = href.startsWith("http");
        if (isExternal) {
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => (onAction ? onAction() : null)}
            >
              <Image src={image} alt={label} width={30} height={30} />
            </a>
          );
        }

        return (
          <Link key={label} href={href} onClick={() => (onAction ? onAction() : null)}>
            <Image src={image} alt={label} width={30} height={30} />
          </Link>
        );
      })}
    </nav>
  );
});

Social.displayName = "Social";

export default Social;
