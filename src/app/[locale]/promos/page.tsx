import PageHero from "@components/wf/PageHero";
import PromosList from "@components/wf/PromosList";
import { pageMeta } from "@components/wf/seo";
import wf from "@components/wf/wf.module.scss";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  return pageMeta(locale, "promos", {
    ru: {
      title: "Предложения на фильтры для воды | Aqua Viina",
      description: "Фильтры обратного осмоса и картриджи по сниженной цене. Доставка по Молдове, установка бесплатно при покупке у нас.",
    },
    ro: {
      title: "Oferte la filtre de apă | Aqua Viina",
      description: "Filtre cu osmoză inversă și cartușe la preț redus. Livrare în Moldova, instalare gratuită la cumpărare de la noi.",
    },
  });
}

const Page = async ({ params }: { params: Promise<{ locale: "ru" | "ro" }> }) => {
  const { locale } = await params;
  const ro = locale === "ro";
  return (
    <>
      <PageHero
        eyebrow={ro ? "Oferte" : "Предложения"}
        title={ro ? "Prețuri reduse la filtre de apă" : "Сниженные цены на фильтры для воды"}
        text={
          ro
            ? "Modele la care prețul de acum e mai mic decât cel obișnuit. Instalarea e gratuită dacă filtrul e cumpărat de la noi."
            : "Модели, у которых цена сейчас ниже обычной. Установка бесплатно, если фильтр куплен у нас."
        }
      />
      <section className={wf.section}>
        <div className={wf.container}>
          <PromosList />
        </div>
      </section>
    </>
  );
};

export default Page;
