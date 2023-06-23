import { OrderStatus } from "@/constants";
import { Product } from "./product-types";

export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

export type OrderItem = {
  product: Product | string;
  qty: number;
};

export type Order = {
  _id?: string;
  orderNumber?: string;
  amount?: number;
  status?: OrderStatus;
  items: OrderItem[];
  note?: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  billingAddress: Address;
  shipToDifferentAddress?: boolean;
  shippingAddress?: Address;
  createdAt?: string;
};

export type OrderChartItem = {
  date: string;
  count: number;
};

export type OrderQuery = {
  orderNumber?: string;
  status?: string;
  orderBy?: string;
  order?: string;
};
