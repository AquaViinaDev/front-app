import styles from "./CategoriesSection.module.scss";
import { CategoriesList } from "./component/CategoriesList";

const CategoriesSection = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Какой фильтр выбрать?</h2>
        <p className={styles.subtitle}>Для твоего удобства мы разделили их на 4 категории.</p>
        <CategoriesList />
      </div>
    </section>
  );
};
export default CategoriesSection;
