import { ServicesPage } from "@components/ServicesPage";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: "ru" | "ro" }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const titles = {
    ru: "Установка, замена картриджей и ремонт фильтров для воды — AquaViina",
    ro: "Montaj, înlocuire cartușe și reparații filtre de apă — AquaViina",
  };

  const descriptions = {
    ru: "Профессиональная установка фильтров, замена картриджей и ремонт систем очистки воды в Кишинёве и по всей Молдове. Бесплатная установка при покупке фильтра у нас. Гарантия на все работы — 6 месяцев.",
    ro: "Montaj profesional al filtrelor, înlocuirea cartușelor și reparații ale sistemelor de purificare a apei în Chișinău și în toată Moldova. Montaj gratuit pentru filtrele cumpărate de la noi. Garanție 6 luni pentru toate lucrările.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

const Services = () => {
  return <ServicesPage />;
};

export default Services;
