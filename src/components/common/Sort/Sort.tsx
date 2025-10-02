"use client";

import { useTranslations } from "use-intl";

import styles from "./Sort.module.scss";

export type SortProps = {
  value: "asc" | "desc" | "default";
  onChange: (value: "asc" | "desc" | "default") => void;
};

const Sort = ({ value, onChange }: SortProps) => {
  const t = useTranslations("ProductsPageInformation.filterAndSort");

  return (
    <select
      id="sort"
      value={value}
      onChange={(e) => onChange(e.target.value as "asc" | "desc" | "default")}
      className={styles.root}
    >
      <option value="default">{t("sortDefault")}</option>
      <option value="desc">{t("sortDesc")}</option>
      <option value="asc">{t("sortAsc")}</option>
    </select>
  );
};

export default Sort;
