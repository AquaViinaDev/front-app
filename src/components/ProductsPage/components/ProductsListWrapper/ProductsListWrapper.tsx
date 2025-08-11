"use client";

import { useTranslations } from "use-intl";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductsList } from "../ProductsList";

import styles from "./ProductsListWrapper.module.scss";

const ProductsListWrapper = () => {
  const t = useTranslations();

  return (
    <PageLayout className={styles.pageLayout} title={t("ProductsPageInformation.title")}>
      <ProductsList />
    </PageLayout>
  );
};

export default ProductsListWrapper;
