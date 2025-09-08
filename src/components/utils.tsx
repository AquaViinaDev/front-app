import { CartItem } from "@/components/CartPage/CartContext";

export const getTotalQty = (items: CartItem[] | undefined) => {
  return items?.reduce((sum, item) => sum + item.qty, 0) ?? 0;
};
