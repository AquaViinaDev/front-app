"use client";

import { memo, ReactNode } from "react";

import styles from "./CategoriesList.module.scss";

export type CategoriesListProps = {
  children: ReactNode | ReactNode[];
};

const CategoriesList = memo(({ children }: CategoriesListProps) => {
  return <div className={styles.root}>{children}</div>;
});

CategoriesList.displayName = "CategoriesList";

export default CategoriesList;
