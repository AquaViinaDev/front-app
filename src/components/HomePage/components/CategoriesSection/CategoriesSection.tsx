import { CategoriesList } from "./component/CategoriesList";
import { CategoriesItem } from "./component/CategoriesItem";
import { CustomLink } from "@components/common";
import { RoutesEnum } from "@types";
import { useLocale, useTranslations } from "use-intl";

import styles from "./CategoriesSection.module.scss";

const categoryFilters: Record<string, string> = {
  jug: "Carafe",
  flowFilter: "Filtru de trecere",
  reverseOsmosis: "Osmos",
  prefilter: "Prefiltru",
};

const CategoriesSection = () => {
  const t = useTranslations("CategoriesSection");
  const locale = useLocale();

  const jugUrl = `/${locale}${RoutesEnum.Products}?type=${encodeURIComponent(categoryFilters.jug)}`;
  const flowFilterUrl = `/${locale}${RoutesEnum.Products}?type=${encodeURIComponent(categoryFilters.flowFilter)}`;
  const reverseOsmosisUrl = `/${locale}${RoutesEnum.Products}?type=${encodeURIComponent(categoryFilters.reverseOsmosis)}`;
  const prefilterUrl = `/${locale}${RoutesEnum.Products}?type=${encodeURIComponent(categoryFilters.prefilter)}`;

  return (
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>
        <CategoriesList>
          <CategoriesItem
            categoriesData={{
              image: "/images/cuvshin.png",
              title: t("items.jug.name"),
              description: t("items.jug.description"),
            }}
          >
            <CustomLink
              className={styles.link}
              link={jugUrl}
              linkName={t("items.jug.buttonText")}
            />
          </CategoriesItem>
          <CategoriesItem
            categoriesData={{
              image: "/images/protochniy.png",
              title: t("items.flowFilter.name"),
              description: t("items.flowFilter.description"),
            }}
          >
            <CustomLink
              className={styles.link}
              link={flowFilterUrl}
              linkName={t("items.flowFilter.buttonText")}
            />
          </CategoriesItem>
          <CategoriesItem
            categoriesData={{
              image: "/images/osmos.png",
              title: t("items.reverseOsmosis.name"),
              description: t("items.reverseOsmosis.description"),
            }}
          >
            <CustomLink
              className={styles.link}
              link={reverseOsmosisUrl}
              linkName={t("items.reverseOsmosis.buttonText")}
            />
          </CategoriesItem>
          <CategoriesItem
            categoriesData={{
              image: "/images/predfilters.png",
              title: t("items.prefilter.name"),
              description: t("items.prefilter.description"),
            }}
          >
            <CustomLink
              className={styles.link}
              link={prefilterUrl}
              linkName={t("items.prefilter.buttonText")}
            />
          </CategoriesItem>
        </CategoriesList>
      </div>
    </section>
  );
};
export default CategoriesSection;
