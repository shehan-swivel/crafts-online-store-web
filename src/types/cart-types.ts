export type CartItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  qty: number;
  image?: string;
};

export type Cart = {
  items: CartItem[];
};
