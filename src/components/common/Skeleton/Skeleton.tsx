"use client";

import classNames from "classnames";
import type { CSSProperties } from "react";

import styles from "./Skeleton.module.scss";

export type SkeletonProps = {
  className?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
};

export const Skeleton = ({ className, width, height, radius }: SkeletonProps) => {
  return (
    <span
      className={classNames(styles.skeleton, className)}
      style={{ width, height, borderRadius: radius }}
      aria-hidden
    />
  );
};

export default Skeleton;
