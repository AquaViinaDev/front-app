import { memo, ElementType, ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./ShortInfoBlockItem.module.scss";

type AsProp<T extends ElementType> = {
  as?: T;
};

export type ShortInfoBlockItemProps<T extends ElementType = "button"> = {
  image: string;
  text: string;
  className?: string;
} & AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

const ShortInfoBlockItem = <T extends ElementType = "button">({
  image,
  text,
  as,
  className,
  ...props
}: ShortInfoBlockItemProps<T>) => {
  const Component = as || "button";

  return (
    <Component className={classNames(styles.root, className)} {...props}>
      <div className={styles.imageWrapper}>
        <Image src={image} alt={text} width={30} height={30} />
      </div>
      <p className={styles.text}>{text}</p>
    </Component>
  );
};

export default memo(ShortInfoBlockItem);
