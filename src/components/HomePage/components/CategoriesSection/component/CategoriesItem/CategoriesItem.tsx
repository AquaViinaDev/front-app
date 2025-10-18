"use client";

import { memo, ReactNode } from "react";
import Image from "next/image";

import styles from "./CategoriesItem.module.scss";

export type CategoriesItemType = {
  image: string;
  title: string;
  description: string;
};

export type CategoriesItemProps = {
  categoriesData: CategoriesItemType;
  children: ReactNode;
};

const CategoriesItem = memo(({ categoriesData, children }: CategoriesItemProps) => {
  const { image, title, description } = categoriesData;
  return (
    <div className={styles.root}>
      <Image
        src={image}
        alt={title}
        width={260}
        height={286}
        style={{ width: "100%", height: "auto" }}
      />
      <div className={styles.infoBlock}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        {children}
      </div>
    </div>
  );
});

CategoriesItem.displayName = "CategoriesItem";

export default CategoriesItem;
