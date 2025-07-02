"use client";

import { memo, ReactNode } from "react";

import styles from "./CategoriesItem.module.scss";
import Image from "next/image";

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
      <Image src={image} alt={title} width={260} height={286} layout="responsive" />
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
