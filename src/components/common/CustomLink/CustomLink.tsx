"use client";

import Link, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, memo, MouseEventHandler } from "react";
import classNames from "classnames";

import styles from "./CustomLink.module.scss";

type CustomLinkProps = {
  link: string;
  linkName: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<NextLinkProps, "href">;

const CustomLink = memo(({ link, linkName, className, onClick, ...props }: CustomLinkProps) => {
  return (
    <div className={classNames(className, styles.root)}>
      <Link href={link} onClick={onClick} {...props}>
        {linkName}
      </Link>
    </div>
  );
});

CustomLink.displayName = "CustomLink";

export default CustomLink;
