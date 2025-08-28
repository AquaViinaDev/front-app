import Link from "next/link";
import Image from "next/image";
import { CartAmount } from "@/components/common";
import RemoveIcon from "@/assets/icons/remove-icon.svg";

import styles from "./CartProductItem.module.scss";

const CartProductItem = () => {
  return (
    <div className={styles.root}>
      <Link className={styles.link} href={"/products"}>
        <Image
          src={"/images/cuvshin.png"}
          alt={"title"}
          width={81}
          height={81}
          className={styles.itemImage}
        />
        <h3 className={styles.title}>название товара</h3>
      </Link>
      <div className={styles.counter}>
        <CartAmount className={styles.cartAmount} onChange={() => console.log("ok")} value={1} />
        <p className={styles.onePrice}>* 4069 лей</p>
        <p className={styles.totalPrice}>28,483 лей</p>
      </div>
      <button className={styles.removeBtn}>
        <RemoveIcon />
      </button>
    </div>
  );
};

export default CartProductItem;
