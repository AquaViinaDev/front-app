"use client";

import { useEffect } from "react";
import { useLocale } from "use-intl";
import Link from "next/link";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();

  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div style={{ padding: "24px 0", textAlign: "center" }}>
      <h2 style={{ marginBottom: 8 }}>Что-то пошло не так</h2>
      <p style={{ marginBottom: 16 }}>
        Не удалось загрузить страницу товара. Попробуйте еще раз.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={reset} type="button">
          Повторить
        </button>
        <Link href={`/${locale}/products`}>Вернуться в каталог</Link>
      </div>
    </div>
  );
}
