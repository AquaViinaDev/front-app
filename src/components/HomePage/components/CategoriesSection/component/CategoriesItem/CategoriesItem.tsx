"use client";

import { CSSProperties, memo, ReactNode } from "react";
import Image from "next/image";

import styles from "./CategoriesItem.module.scss";

export type CategoriesItemType = {
  image: string;
  title: string;
  description: string;
  imageObjectPosition?: string;
};

export type CategoriesItemProps = {
  categoriesData: CategoriesItemType;
  children: ReactNode;
};

const CategoriesItem = memo(({ categoriesData, children }: CategoriesItemProps) => {
  const { image, title, description, imageObjectPosition } = categoriesData;
  return (
    <div className={styles.root}>
      <div
        className={styles.imageWrapper}
        style={
          {
            "--image-position": imageObjectPosition ?? "50% 50%",
          } as CSSProperties
        }
      >
        <Image src={image} alt={title} width={260} height={286} className={styles.image} />
      </div>
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
