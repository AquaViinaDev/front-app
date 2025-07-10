import { RoutesEnum } from "@/types";

export const getNavLinks = (t: (key: string) => string, locale: string) => [
  { label: t("Header.products"), href: `/${locale}${RoutesEnum.Products}` },
  { label: t("Header.services"), href: `/${locale}${RoutesEnum.Services}` },
  { label: t("Header.contacts"), href: `/${locale}${RoutesEnum.Contacts}` },
  { label: t("Header.about"), href: `/${locale}${RoutesEnum.About}` },
];
