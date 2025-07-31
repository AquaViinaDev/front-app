"use client";

import { HtmlHTMLAttributes, memo, ReactNode } from "react";
import classNames from "classnames";

import styles from "./PageLayout.module.scss";

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
          <div className={styles.headerPage}>
            <h1 className={styles.title}>{title}</h1>
            {/*<div className={styles.actionsWrapper}>*/}
            {/*  <form className={styles.form} typeof="submit" onSubmit={(e) => e.preventDefault()}>*/}
            {/*    <input placeholder={"Search"} value={""} onChange={(e) => e.target.value} />*/}
            {/*    <button>Ok</button>*/}
            {/*  </form>*/}
            {/*  <select defaultValue="">*/}
            {/*    <option value="" disabled hidden>*/}
            {/*      Сортировка*/}
            {/*    </option>*/}
            {/*    <option value="1">По алфавиту</option>*/}
            {/*    <option value="2">Сначала дешевые</option>*/}
            {/*    <option value="3">Сначала дорогие</option>*/}
            {/*  </select>*/}
            {/*</div>*/}
          </div>
          <div className={styles.contentWrapper}>
            {/*<div className={styles.barBlock}>*/}
            {/*  <div className={styles.brendBlock}>*/}
            {/*    <p className={styles.brendTitle}>Бренд</p>*/}
            {/*    <button>Aquaphor</button>*/}
            {/*    <button>Dafi</button>*/}
            {/*    <button>ESLI</button>*/}
            {/*  </div>*/}
            {/*  <div className={styles.priceBlock}>*/}
            {/*    <p className={styles.priceTitle}>Цена</p>*/}
            {/*  </div>*/}
            {/*  <div className={styles.chapterBlock}>*/}
            {/*    <p className={styles.chapterTitle}>Раздел</p>*/}
            {/*    <button>Все товары</button>*/}
            {/*    <button>Картриджи</button>*/}
            {/*    <button>Кувшины</button>*/}
            {/*    <button>Обратные осмосы</button>*/}
            {/*    <button>Проточные фильтры</button>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className={classNames(contentClassName, styles.content)}>
              {isLoading ? "Loading..." : children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PageLayout.displayName = "PageLayout";

export default PageLayout;
