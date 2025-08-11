export enum RoutesEnum {
  Main = "/",
  Products = "/products",
  About = "/about",
  Services = "/services",
  Contacts = "/contacts",
}

export type Locale = "ru" | "ro";

export type LocalizedString = {
  ru: string;
  ro: string;
};

export type Product = {
  id: string;
  name: LocalizedString;
  brand: LocalizedString | null;
  description: LocalizedString;
  image: string;
  price: string;
  inStock: boolean;
  stockQty: number;
  deliveryAvailable: boolean;
  characteristics:
    | Record<string, string | null>
    | { ru: Record<string, string | null>; ro: Record<string, string | null> };
  categorieIds: string[];
};
