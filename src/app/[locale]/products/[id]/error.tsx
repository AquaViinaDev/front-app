"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "use-intl";
import Link from "next/link";
import { Button } from "@components/common";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div style={{ padding: "24px 0", textAlign: "center" }}>
      <h2 style={{ marginBottom: 8 }}>{t("errorTitle")}</h2>
      <p style={{ marginBottom: 16 }}>
        {t("errorText")}
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Button onClick={reset} type="button">
          {t("retry")}
        </Button>
        <Link href={`/${locale}/products`}>{t("backToCatalog")}</Link>
      </div>
    </div>
  );
}
