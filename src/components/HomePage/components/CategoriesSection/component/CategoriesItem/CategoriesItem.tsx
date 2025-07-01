"use client";

import { memo } from "react";

import styles from "./CategoriesItem.module.scss";
import Image from "next/image";
import { Button } from "@/components/common/Button";

export type CategoriesItemType = {
  image: string;
  title: string;
  subtitle: string;
  btnText: string;
};

export type CategoriesItemProps = {
  categoriesData: CategoriesItemType;
};

const CategoriesItem = memo(({ categoriesData }: CategoriesItemProps) => {
  const { image, title, subtitle, btnText } = categoriesData;
  return (
    <div className={styles.root}>
      <Image src={image} alt={title} width={260} height={286} />
      <div className={styles.infoBlock}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{subtitle}</p>
        <Button className={styles.button} buttonType={"smallButton"}>
          {btnText}
        </Button>
      </div>
    </div>
  );
});

CategoriesItem.displayName = "CategoriesItem";

export default CategoriesItem;
