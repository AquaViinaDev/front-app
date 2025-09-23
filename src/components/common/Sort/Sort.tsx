"use client";

import { useState } from "react";
import { useTranslations } from "use-intl";

import styles from "./Sort.module.scss";

const Sort = () => {
  const t = useTranslations("ProductsPageInformation.filterAndSort");
  const [sort, setSort] = useState("default");
  return (
    <select
      id="sort"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className={styles.root}
    >
      <option value="default">{t("sortDefault")}</option>
      <option value="price_desc">{t("sortDesc")}</option>
      <option value="price_asc">{t("sortAsc")}</option>
    </select>
  );
};
export default Sort;
