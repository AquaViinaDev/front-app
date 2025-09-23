import { memo } from "react";
import { Button } from "@/components/common";
import { useTranslations } from "use-intl";

import styles from "./SecviceItem.module.scss";

export type ServiceItemType = {
  title?: string;
  description?: string;
  price?: number;
  handleModal?: () => void;
};

const ServiceItem = memo(({ handleModal, title, description, price }: ServiceItemType) => {
  const t = useTranslations("ServicePage");

  return (
    <li className={styles.root}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>
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
});

ServiceItem.displayName = "ServiceItem";

export default ServiceItem;
