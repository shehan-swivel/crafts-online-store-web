import { ProductCategory } from "@/constants/enums";

export type Product = {
  _id: string;
  name: string;
  description?: string;
  qty: number;
  price: number;
  category: ProductCategory;
  image?: string;
};

export type ProductQuery = {
  name?: string;
  category?: ProductCategory;
};
