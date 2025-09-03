import Link from "next/link";
import Image from "next/image";
import { CartAmount } from "@/components/common";
import RemoveIcon from "@/assets/icons/remove-icon.svg";
import { useOrder } from "../../CartContext";

import styles from "./CartProductItem.module.scss";

export type CartProductItemType = {
  id: string;
  name: {
    ro: string;
    ru: string;
  };
  image: string;
  price: number;
  qty: number;
  totalPrice: number;
};

export type CartProductItemProps = {
  item: CartProductItemType;
};

const CartProductItem = ({ item }: CartProductItemProps) => {
  const { id, name, image, price, qty, totalPrice } = item;
  const { updateProductQty, removeProduct } = useOrder();

  return (
    <div className={styles.root}>
      <Link className={styles.link} href={"/products"}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
          alt={name.ro}
          width={81}
          height={81}
          className={styles.itemImage}
        />
        <h3 className={styles.title}>{name.ru}</h3>
      </Link>
      <div className={styles.counter}>
        <CartAmount
          className={styles.cartAmount}
          onChange={(value) => updateProductQty(id, value)}
          value={qty}
        />
        <p className={styles.onePrice}>* {price} лей</p>
        <p className={styles.totalPrice}>{totalPrice} лей</p>
      </div>
      <button className={styles.removeBtn} onClick={() => removeProduct(id)}>
        <RemoveIcon />
      </button>
    </div>
  );
};

export default CartProductItem;
