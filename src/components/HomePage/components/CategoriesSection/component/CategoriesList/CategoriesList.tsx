"use client";

import { memo } from "react";

import styles from "./CategoriesList.module.scss";
import CategoriesItem, { CategoriesItemType } from "../CategoriesItem/CategoriesItem";

const CategoriesItems: CategoriesItemType[] = [
  {
    image: "/images/cuvshin.png",
    title: "Кувшины",
    subtitle:
      "Если пьете мало воды, арендуете жилье или часто переезжаете. Недорогой, но требует частой замены картриджей",
    btnText: "Перейти к кувшинам",
  },
  {
    image: "/images/protochniy.png",
    title: "Проточный фильтр",
    subtitle:
      "Для семьи 2-4 человека. Устанавливается на кран или под мойку, очищает воду от основных загрязнений. Оптимальный баланс цены и качества.",
    btnText: "Перейти к проточным",
  },
  {
    image: "/images/osmos.png",
    title: "Обратный осмос",
    subtitle:
      "Для максимальной очистки. Идеален для семей с детьми, аллергиков и тех, кто хочет кристально чистую воду без примесей.",
    btnText: "Перейти к осмосам",
  },
  {
    image: "/images/predfilters.png",
    title: "Предфильтра",
    subtitle:
      "Эти фильтры защищают не только вас, но и ваш дом. Они устанавливаются на входе воды в дом или перед отдельной техникой — например, перед котлом, стиральной или посудомоечной машиной. Но не предназначены для питья.",
    btnText: "Перейти к предфильтрам",
  },
];

const CategoriesList = memo(() => {
  return (
    <div className={styles.root}>
      {CategoriesItems.map((item) => (
        <CategoriesItem key={item.subtitle} categoriesData={item} />
      ))}
    </div>
  );
});

CategoriesList.displayName = "CategoriesList";

export default CategoriesList;
