import { HTMLAttributes, memo, ReactNode } from "react";

import styles from "./AboutDescriptionItem.module.scss";

export type AboutDescriptionItemType = {
  title: string;
  children: ReactNode | ReactNode[];
} & HTMLAttributes<HTMLLIElement>;

const AboutDescriptionItem = memo(({ title, children, ...props }: AboutDescriptionItemType) => {
  return (
    <li className={styles.root} {...props}>
      <h3 className={styles.title}>{title}</h3>
      {children ?? children}
    </li>
  );
});

AboutDescriptionItem.displayName = "AboutDescriptionItem";

export default AboutDescriptionItem;
