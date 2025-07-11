import { CategoriesList } from "./component/CategoriesList";
import { CategoriesItem } from "./component/CategoriesItem";
import { CustomLink } from "@/components/common";
import { RoutesEnum } from "@/types";
import { useTranslations } from "use-intl";

import styles from "./CategoriesSection.module.scss";

const CategoriesSection = () => {
  const t = useTranslations("CategoriesSection");

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
              link={RoutesEnum.Products}
              linkName={t("items.jug.buttonText")}
              onClick={() => console.log("Кувшины")}
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
              link={RoutesEnum.Products}
              linkName={t("items.flowFilter.buttonText")}
              onClick={() => console.log("Перейти к проточны")}
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
              link={RoutesEnum.Products}
              linkName={t("items.reverseOsmosis.buttonText")}
              onClick={() => console.log("Перейти к осмосам")}
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
              link={RoutesEnum.Products}
              linkName={t("items.prefilter.buttonText")}
              onClick={() => console.log("Перейти к предфильтрам")}
            />
          </CategoriesItem>
        </CategoriesList>
      </div>
    </section>
  );
};
export default CategoriesSection;
