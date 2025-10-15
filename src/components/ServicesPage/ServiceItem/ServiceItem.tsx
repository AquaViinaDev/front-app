import { memo, useState } from "react";
import { Button } from "@components/common";
import { useTranslations } from "use-intl";

import styles from "./SecviceItem.module.scss";

export type ServiceItemType = {
  title?: string;
  description?: string;
  price?: number;
  handleModal?: () => void;
  maxLength?: number;
};

const ServiceItem = memo(
  ({ handleModal, title, description, price, maxLength = 200 }: ServiceItemType) => {
    const t = useTranslations("ServicePage");
    const [expanded, setExpanded] = useState(false);

    const isLong = description && description.length > maxLength;
    const displayedText =
      !isLong || expanded ? description : description?.slice(0, maxLength) + "...";

    return (
      <li className={styles.root}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.content}>
          <p className={styles.description}>
            {displayedText}
            {isLong && (
              <button
                type="button"
                className={styles.readMore}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "read less" : "read more"}
              </button>
            )}
          </p>
          <div className={styles.actions}>
            <p className={styles.price}>
              {t("from")} {price} {t("currency")}
            </p>
            <Button
              buttonType={"smallButton"}
              onClick={() => {
                if (handleModal) handleModal();
              }}
            >
              {t("button")}
            </Button>
          </div>
        </div>
      </li>
    );
  }
);

ServiceItem.displayName = "ServiceItem";

export default ServiceItem;
