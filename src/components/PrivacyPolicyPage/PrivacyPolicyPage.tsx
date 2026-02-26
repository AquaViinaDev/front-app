"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { useLocale } from "use-intl";

import styles from "./PrivacyPolicyPage.module.scss";

const PrivacyPolicyPage = () => {
  const locale = useLocale();
  const isRo = locale === "ro";

  const content = isRo
    ? {
        title: "Politica de confidențialitate",
        intro:
          "Această politică descrie modul în care AquaViina colectează, utilizează și protejează datele personale transmise prin formularele de pe site.",
        sections: [
          {
            title: "1. Ce date colectăm",
            text: "Putem colecta numele, numărul de telefon și alte date pe care le introduceți voluntar în formulare.",
          },
          {
            title: "2. Scopul prelucrării",
            text: "Datele sunt utilizate pentru a vă contacta, pentru consultanță, procesarea solicitărilor și îmbunătățirea serviciilor noastre.",
          },
          {
            title: "3. Confidențialitate și securitate",
            text: "Aplicăm măsuri tehnice și organizatorice rezonabile pentru a proteja datele împotriva accesului neautorizat.",
          },
          {
            title: "4. Drepturile dvs.",
            text: "Aveți dreptul să solicitați accesul, rectificarea sau ștergerea datelor personale, precum și retragerea consimțământului.",
          },
          {
            title: "5. Contact",
            text: "Pentru întrebări privind prelucrarea datelor personale, ne puteți contacta prin canalele de contact indicate pe site.",
          },
        ],
      }
    : {
        title: "Политика конфиденциальности",
        intro:
          "Настоящая политика описывает, как AquaViina собирает, использует и защищает персональные данные, переданные через формы на сайте.",
        sections: [
          {
            title: "1. Какие данные мы собираем",
            text: "Мы можем собирать имя, номер телефона и другие данные, которые вы добровольно указываете в формах.",
          },
          {
            title: "2. Цели обработки",
            text: "Данные используются для связи с вами, консультации, обработки заявок и улучшения качества наших услуг.",
          },
          {
            title: "3. Конфиденциальность и защита",
            text: "Мы применяем разумные технические и организационные меры для защиты данных от несанкционированного доступа.",
          },
          {
            title: "4. Ваши права",
            text: "Вы можете запросить доступ, исправление или удаление персональных данных, а также отозвать согласие на обработку.",
          },
          {
            title: "5. Контакты",
            text: "По вопросам обработки персональных данных вы можете связаться с нами через контакты, указанные на сайте.",
          },
        ],
      };

  return (
    <PageLayout className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.intro}>{content.intro}</p>
        <div className={styles.sections}>
          {content.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <p className={styles.text}>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
