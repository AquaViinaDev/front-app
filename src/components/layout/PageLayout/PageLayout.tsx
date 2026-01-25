"use client";

import { CSSProperties, HtmlHTMLAttributes, memo, ReactNode } from "react";
import classNames from "classnames";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./PageLayout.module.scss";
import {useLocale} from "use-intl";

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
  backButtonClassName?: string;
  title?: string;
  showArrowBack?: boolean;
};

const PageLayout = memo(
  ({
    wrapperClassName,
    contentClassName,
    backButtonClassName,
    className,
    showArrowBack = false,
    title,
    children,
    isLoading,
    ...props
  }: PageLayoutTypeProps) => {
    const router = useRouter();
    const locale = useLocale();

    const handleBackClick = () => {
      router.push(`/${locale}/products`);
    };

    return (
      <div className={classNames(className, styles.root)} {...props}>
        <div className={classNames(wrapperClassName, styles.wrapper)}>
          {title ? (
            <div className={styles.headerPage}>
              {showArrowBack && (
                <button className={classNames(backButtonClassName, styles.backButton)} onClick={handleBackClick}>
                  <Image src={"/arrow-back.svg"} alt={"ArrowBack"} width={40} height={40}/>
                </button>
              )}
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
