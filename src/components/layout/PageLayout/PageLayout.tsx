"use client";

import { CSSProperties, HtmlHTMLAttributes, memo, ReactNode } from "react";
import classNames from "classnames";
import { ClipLoader } from "react-spinners";

import styles from "./PageLayout.module.scss";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#04559b",
};

export type PageLayoutTypeProps = HtmlHTMLAttributes<HTMLDivElement> & {
  children?: ReactNode | ReactNode[];
  isLoading?: boolean;
  className?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  title?: string;
};

const PageLayout = memo(
  ({
    wrapperClassName,
    contentClassName,
    className,
    title,
    children,
    isLoading,
    ...props
  }: PageLayoutTypeProps) => {
    return (
      <div className={classNames(className, styles.root)} {...props}>
        <div className={classNames(wrapperClassName, styles.wrapper)}>
          {title ? (
            <div className={styles.headerPage}>
              <h1 className={styles.title}>{title}</h1>
            </div>
          ) : null}
          <div className={styles.contentWrapper}>
            <div className={classNames(contentClassName, styles.content)}>
              {isLoading ? (
                <ClipLoader
                  loading={isLoading}
                  cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PageLayout.displayName = "PageLayout";

export default PageLayout;
