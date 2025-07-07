"use client";

import { WorkSteppItem } from "./WorkSteppItem";

import styles from "./WorkStepperSection.module.scss";

const WorkStepperSection = () => {
  return (
    <div className={styles.root}>
      <div className={styles.descriptionWrapper}>
        <h3 className={styles.title}>🔧 Как мы работаем</h3>
        <h4 className={styles.subtitle}>5 простых шагов</h4>
      </div>
      <ul className={styles.stepWrapper}>
        <WorkSteppItem
          stepNumber={1}
          description={
            "Указываете только имя и номер телефона — заявка занимает не больше 15 секунд."
          }
        >
          Оставляете заявку ниже
        </WorkSteppItem>
        <WorkSteppItem
          stepNumber={2}
          description={
            "Быстро связываемся с вами, чтобы помочь выбрать лучший фильтр — под ваш дом, семью и потребности."
          }
        >
          Мы перезваниваем
        </WorkSteppItem>
        <WorkSteppItem
          stepNumber={3}
          description={"Привозим фильтр в удобное время и предоставляем официальную гарантию."}
        >
          Доставляем с гарантией
        </WorkSteppItem>
        <WorkSteppItem
          stepNumber={4}
          description={
            "Наш мастер устанавливает фильтр и тщательно проверяет его работу — всё сразу, без лишних хлопот."
          }
        >
          Устанавливаем и проверяем
        </WorkSteppItem>
        <WorkSteppItem
          stepNumber={5}
          description={
            "Раз в полгода мы сами вам звоним и приезжаем в удобный день, чтобы заменить картриджи и поддерживать чистоту воды."
          }
        >
          Напоминаем и обслуживаем
        </WorkSteppItem>
      </ul>
    </div>
  );
};

export default WorkStepperSection;
