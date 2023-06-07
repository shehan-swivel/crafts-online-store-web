import { OrderStatus } from "@/constants";
import { Product } from "./product-types";

export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

export type OrderItem = {
  product: Product;
  qty: number;
};

export type Order = {
  _id: string;
  amount: number;
  status: OrderStatus;
  items: OrderItem[];
  note?: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  billingAddress: Address;
  shippingAddress: Address;
  createdAt: string;
};
