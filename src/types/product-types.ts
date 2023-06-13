import { ProductCategory } from "@/constants";

export type Product = {
  _id?: string;
  name: string;
  description?: string;
  qty: number;
  price: number;
  category: ProductCategory | "";
  image?: string | File;
};

export type ProductQuery = {
  name?: string;
  category?: ProductCategory;
  limit?: number;
};

export type TableHeaderCell = {
  id: string;
  label: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
};
