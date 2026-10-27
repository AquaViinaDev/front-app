"use client";

import { useLocale } from "use-intl";
import ProductCards from "./ProductCards";

// Предложения: товары, у которых в таблице есть «старая цена» выше текущей
const PromosList = () => {
  const ro = useLocale() === "ro";
  return (
    <ProductCards
      filter={(items) =>
        items
          .filter((item) => {
            const price = Number(item.price);
            const old = Number(item.oldPrice);
            return Number.isFinite(price) && Number.isFinite(old) && old > price && price > 0;
          })
          .sort((a, b) => Number(b.inStock) - Number(a.inStock))
      }
      emptyText={ro ? "Momentan nu sunt oferte." : "Сейчас предложений нет."}
    />
  );
};

export default PromosList;
