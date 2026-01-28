"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "use-intl";

const Breadcrumbs = () => {
  const pathname = usePathname(); // например, /products/filters
  const t = useTranslations("Common");
  const pathParts = pathname.split("/").filter(Boolean);

  const crumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    return { name: decodeURIComponent(part), href };
  });

  return (
    <nav aria-label="breadcrumbs" className="text-sm">
      <ul className="flex space-x-2">
        <li>
          <Link href="/" className="text-blue-500 hover:underline">
            {t("breadcrumbHome")}
          </Link>
          <span>/</span>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.href}>
            <Link href={crumb.href} className="text-blue-500 hover:underline">
              {crumb.name}
            </Link>
            {i < crumbs.length - 1 && <span>/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
