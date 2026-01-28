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
  icon?: "install" | "replace" | "repair";
};

const ServiceItem = memo(
  ({
    handleModal,
    title,
    description,
    price,
    maxLength = 200,
    icon = "install",
  }: ServiceItemType) => {
    const t = useTranslations("ServicePage");
    const [expanded, setExpanded] = useState(false);

    const isLong = description && description.length > maxLength;
    const displayedText =
      !isLong || expanded ? description : description?.slice(0, maxLength) + "...";
    const paragraphs = displayedText?.split("\n\n").filter(Boolean) ?? [];

    const renderIcon = () => {
      switch (icon) {
        case "replace":
          return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 3v4a4 4 0 0 0 4 4h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 21v-4a4 4 0 0 0-4-4h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 7l4-4 4 4M10 17l-4 4-4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        case "repair":
          return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3a2 2 0 0 1 2 2v1.1a7.6 7.6 0 0 1 2.2.9l.8-.8a2 2 0 1 1 2.8 2.8l-.8.8a7.6 7.6 0 0 1 .9 2.2H21a2 2 0 1 1 0 4h-1.1a7.6 7.6 0 0 1-.9 2.2l.8.8a2 2 0 1 1-2.8 2.8l-.8-.8a7.6 7.6 0 0 1-2.2.9V19a2 2 0 1 1-4 0v-1.1a7.6 7.6 0 0 1-2.2-.9l-.8.8a2 2 0 1 1-2.8-2.8l.8-.8a7.6 7.6 0 0 1-.9-2.2H3a2 2 0 1 1 0-4h1.1a7.6 7.6 0 0 1 .9-2.2l-.8-.8a2 2 0 1 1 2.8-2.8l.8.8a7.6 7.6 0 0 1 2.2-.9V5a2 2 0 0 1 2-2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          );
        default:
          return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 12h3l2-3 4 6 3-4 2 3h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 6h14a2 2 0 0 1 2 2v10H3V8a2 2 0 0 1 2-2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
      }
    };

    return (
      <li className={styles.root}>
        <div className={styles.header}>
          <div className={styles.icon}>{renderIcon()}</div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.content}>
          <div
            className={expanded ? styles.descriptionExpanded : styles.descriptionCollapsed}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.descriptionText}>
                {paragraph}
              </p>
            ))}
          </div>
          {isLong && (
            <button
              type="button"
              className={styles.readMore}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? t("readLess") : t("readMore")}
            </button>
          )}
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
