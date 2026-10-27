import PageHero from "@components/wf/PageHero";
import Podbor from "@components/wf/Podbor";
import { pageMeta } from "@components/wf/seo";
import wf from "@components/wf/wf.module.scss";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  return pageMeta(locale, "podbor-filtra", {
    ru: {
      title: "Подбор фильтра для воды за 1 минуту | Aqua Viina",
      description: "Ответьте на 4 вопроса — покажем, какой фильтр для воды подойдёт вашей квартире или дому. Бесплатная консультация.",
    },
    ro: {
      title: "Alege filtrul de apă în 1 minut | Aqua Viina",
      description: "Răspunde la 4 întrebări — îți arătăm ce filtru de apă se potrivește apartamentului sau casei tale. Consultație gratuită.",
    },
  });
}

const Page = async ({ params }: { params: Promise<{ locale: "ru" | "ro" }> }) => {
  const { locale } = await params;
  const ro = locale === "ro";
  return (
    <>
      <PageHero
        eyebrow={ro ? "1 minut" : "1 минута"}
        title={ro ? "Alege filtrul de apă" : "Подбор фильтра для воды"}
        text={
          ro
            ? "4 întrebări simple — și îți arătăm ce tip de filtru ți se potrivește. Apoi, dacă vrei, te sunăm și alegem modelul exact."
            : "4 простых вопроса — и покажем, какой тип фильтра вам подходит. Потом, если хотите, перезвоним и подберём точную модель."
        }
      />
      <section className={wf.section}>
        <div className={wf.container}>
          <Podbor />
        </div>
      </section>
    </>
  );
};

export default Page;
