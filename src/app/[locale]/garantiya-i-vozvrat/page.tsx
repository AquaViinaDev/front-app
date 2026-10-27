import PageHero from "@components/wf/PageHero";
import { PHONE, PHONE_HREF } from "@components/wf/content";
import { pageMeta } from "@components/wf/seo";
import wf from "@components/wf/wf.module.scss";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  return pageMeta(locale, "garantiya-i-vozvrat", {
    ru: {
      title: "Гарантия и возврат | Aqua Viina",
      description: "Гарантия на установку фильтров для воды и условия возврата товара в Aqua Viina.",
    },
    ro: {
      title: "Garanție și retur | Aqua Viina",
      description: "Garanția pentru instalarea filtrelor de apă și condițiile de retur la Aqua Viina.",
    },
  });
}

const Page = async ({ params }: { params: Promise<{ locale: "ru" | "ro" }> }) => {
  const { locale } = await params;
  const ro = locale === "ro";
  return (
    <>
      <PageHero eyebrow={ro ? "Informații" : "Информация"} title={ro ? "Garanție și retur" : "Гарантия и возврат"} />
      <section className={wf.section}>
        <div className={wf.prose}>
          <h2>{ro ? "Garanție pentru lucrări" : "Гарантия на работы"}</h2>
          <p>
            {ro
              ? "Pentru instalarea și conectarea filtrului oferim garanție de 6 luni. Dacă în această perioadă apare o scurgere din cauza montajului, venim și o reparăm gratuit."
              : "На установку и подключение фильтра даём гарантию 6 месяцев. Если за это время из-за монтажа появилась протечка — приедем и исправим бесплатно."}
          </p>
          <h2>{ro ? "Garanție pentru produse" : "Гарантия на товар"}</h2>
          <p
            data-ask={
              ro
                ? "Ce garanție dăm pentru sisteme și componente (termen, ce acoperă)?"
                : "Какая гарантия на системы и комплектующие (срок, что покрывает)?"
            }
          >
            {ro
              ? "Sistemele de filtrare au garanția producătorului."
              : "На системы очистки действует гарантия производителя."}
          </p>
          <h2>{ro ? "Retur în 14 zile" : "Возврат в течение 14 дней"}</h2>
          <p
            data-ask={
              ro ? "De verificat formularea conform legii RM" : "Проверить формулировку по закону РМ"
            }
          >
            {ro
              ? "Poți returna produsul în 14 zile de la primire, dacă nu a fost instalat și folosit și este în ambalajul original. Un filtru deja pus în funcțiune nu mai este în starea inițială și nu se poate returna."
              : "Товар можно вернуть в течение 14 дней с момента получения, если его не устанавливали и не использовали и он в заводской упаковке. Фильтр, который уже запускали, — не в первоначальном виде, и вернуть его нельзя."}
          </p>
          <h2>{ro ? "Cum ne contactezi" : "Как обратиться"}</h2>
          <p>
            {ro ? "Sună-ne: " : "Позвоните нам: "}
            <a href={PHONE_HREF}>{PHONE}</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
