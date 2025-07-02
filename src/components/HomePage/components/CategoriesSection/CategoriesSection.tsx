import { CategoriesList } from "./component/CategoriesList";
import { CategoriesItem } from "./component/CategoriesItem";
import { Button } from "@/components/common/Button";

import styles from "./CategoriesSection.module.scss";

const CategoriesSection = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Какой фильтр выбрать?</h2>
        <p className={styles.subtitle}>Для твоего удобства мы разделили их на 4 категории.</p>
        <CategoriesList>
          <CategoriesItem
            categoriesData={{
              image: "/images/cuvshin.png",
              title: "Кувшины",
              description:
                "Если пьёте мало воды, часто переезжаете или арендуете жильё. Компактный и недорогой. Требует более частой замены картриджей, но прост в установке и удобен в поездках.",
            }}
          >
            <Button
              className={styles.button}
              buttonType={"smallButton"}
              onClick={() => console.log("Кувшины")}
            >
              Перейти к кувшинам
            </Button>
          </CategoriesItem>
          <CategoriesItem
            categoriesData={{
              image: "/images/protochniy.png",
              title: "Проточный фильтр",
              description:
                "Подходит для семьи из 2–4 человек. Устанавливается под мойку или прямо на кран. Эффективно очищает воду от основных загрязнений. Хороший выбор по соотношению цены и качества.",
            }}
          >
            <Button
              className={styles.button}
              buttonType={"smallButton"}
              onClick={() => console.log("Проточный фильтр")}
            >
              Перейти к проточным
            </Button>
          </CategoriesItem>
          <CategoriesItem
            categoriesData={{
              image: "/images/osmos.png",
              title: "Обратный осмос",
              description:
                "Идеален для семей с детьми, аллергиков и всех, кто хочет идеально чистую воду. Удаляет примеси, запахи, тяжёлые металлы и бактерии. Даёт вкусную и безопасную питьевую воду.",
            }}
          >
            <Button
              className={styles.button}
              buttonType={"smallButton"}
              onClick={() => console.log("Обратный осмос")}
            >
              Перейти к осмосам
            </Button>
          </CategoriesItem>
          <CategoriesItem
            categoriesData={{
              image: "/images/predfilters.png",
              title: "Предфильтра",
              description:
                "Устанавливается на входе воды в дом или перед техникой — бойлером, стиральной или посудомоечной машиной. Очищает воду для бытовых нужд, но не предназначен для питья.",
            }}
          >
            <Button
              className={styles.button}
              buttonType={"smallButton"}
              onClick={() => console.log("Предфильтра")}
            >
              Перейти к предфильтрам
            </Button>
          </CategoriesItem>
        </CategoriesList>
      </div>
    </section>
  );
};
export default CategoriesSection;
