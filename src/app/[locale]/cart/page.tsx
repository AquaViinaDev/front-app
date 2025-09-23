import { CartPage } from "../../../components/CartPage";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: "ru" | "ro" };
}): Promise<Metadata> {
  const meta = {
    ru: {
      title: "Корзина — AquaViina",
      description:
        "Ваша корзина покупок в интернет-магазине AquaViina. Здесь вы можете оформить заказ фильтров и систем очистки воды с доставкой по Молдове.",
    },
    ro: {
      title: "Coș de cumpărături — AquaViina",
      description:
        "Coșul dvs. de cumpărături în magazinul online AquaViina. Aici puteți plasa comanda pentru filtre și sisteme de purificare a apei cu livrare în toată Moldova.",
    },
  };

  return {
    title: meta[locale].title,
    description: meta[locale].description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://aqua-viina.md/${locale}/cart`,
      languages: {
        ru: "https://aqua-viina.md/ru/cart",
        ro: "https://aqua-viina.md/ro/cart",
      },
    },
    openGraph: {
      title: meta[locale].title,
      description: meta[locale].description,
      url: `https://aqua-viina.md/${locale}/cart`,
      siteName: "AquaViina",
      type: "website",
    },
  };
}

const Cart = () => {
  return <CartPage />;
};

export default Cart;
