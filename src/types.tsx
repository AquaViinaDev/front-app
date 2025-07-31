export enum RoutesEnum {
  Main = "/",
  Products = "/products",
  About = "/about",
  Services = "/services",
  Contacts = "/contacts",
}

export type Product = {
  id: string;
  name: string;
  brand: string | null;
  description: string;
  image: string;
  price: string;
  inStock: boolean;
  stockQty: number;
  deliveryAvailable: boolean;
  characteristics: Record<string, string>;
  categorieIds: string[];
};
