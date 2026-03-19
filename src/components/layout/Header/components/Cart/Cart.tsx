"use client";

import { RoutesEnum } from "@types";
import Link from "next/link";
import { useLocale } from "use-intl";
import { useOrder } from "@components/CartPage/CartContext";
import { memo, useEffect, useState } from "react";
import { getTotalQty } from "@components/utils";
import classNames from "classnames";
import { CartIcon } from "@components/common";

import styles from "./Cart.module.scss";

export type CartProps = {
  className?: string;
};

const Cart = memo(({ className }: CartProps) => {
  const locale = useLocale();
  const { items } = useOrder();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalQty = getTotalQty(items);

  return (
    <Link href={`/${locale}${RoutesEnum.Cart}`} className={classNames(className, styles.root)}>
      <div className={styles.iconWrapper}>
        <CartIcon className={styles.icon} />
        {mounted && totalQty > 0 && (
          <span className={styles.badge}>{totalQty > 99 ? "99+" : totalQty}</span>
        )}
      </div>
    </Link>
  );
});

Cart.displayName = "Cart";

export default Cart;
