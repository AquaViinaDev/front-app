"use client";

import styles from "./WorkSteppItem.module.scss";
import React, { memo, ReactNode } from "react";

export type WorkSteppItem = {
  stepNumber: number;
  description: string;
  children: ReactNode | ReactNode[];
};

const WorkSteppItem = memo(({ children, stepNumber, description }: WorkSteppItem) => {
  return (
    <li className={styles.root}>
      <div className={styles.stepNumber}>{stepNumber}</div>
      <div className={styles.content}>
        <p className={styles.title}>{children}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  );
});

WorkSteppItem.displayName = "WorkSteppItem";

export default WorkSteppItem;
