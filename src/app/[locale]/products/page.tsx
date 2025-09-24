import { ProductsPage } from "../../../components/ProductsPage";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: "ru" | "ro" }>;
}): Promise<Metadata> {
  const { locale } = await props.params; // ✅ ждем params

  const meta = {
    ru: {
      title: "Каталог фильтров для воды — AquaViina",
      description:
        "Обзор всех фильтров для воды: кувшины, картриджи, обратный осмос. Сравнение, наличие и доставка по Молдове.",
    },
    ro: {
      title: "Catalog filtre de apă — AquaViina",
      description:
        "Prezentare generală a filtrelor de apă: căni, cartușe, osmoză inversă. Comparare, disponibilitate și livrare în Moldova.",
    },
  };

  return {
    title: meta[locale].title,
    description: meta[locale].description,
    alternates: {
      canonical: `https://aqua-viina.md/${locale}/products`,
      languages: {
        ru: "https://aqua-viina.md/ru/products",
        ro: "https://aqua-viina.md/ro/products",
      },
    },
    openGraph: {
      title: meta[locale].title,
      description: meta[locale].description,
      url: `https://aqua-viina.md/${locale}/products`,
      siteName: "AquaViina",
      type: "website",
    },
  };
}

const Products = () => {
  return <ProductsPage />;
};

export default Products;
