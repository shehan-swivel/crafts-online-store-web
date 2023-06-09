import { StorageKeys } from "@/constants";
import { Cart, CartItem } from "@/types/cart-types";

/* 
  The cart service in this application utilizes session storage as the data storage method 
  since customer accounts are not maintained in the database. In the future, if customer accounts 
  are added to the application, these functions can be easily replaced with appropriate APIs. 
*/
export const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
};

/**
 * Get cart details
 */
function getCart(): Cart {
  const cart = JSON.parse(sessionStorage.getItem(StorageKeys.CART) as string);
  return cart;
}

/**
 * Add new item to the cart
 */
function addToCart(newItem: CartItem): Cart {
  const cart = getCart();
  cart.items.push(newItem);
  sessionStorage.setItem(StorageKeys.CART, JSON.stringify(cart));
  return cart;
}

/**
 * Remove an item from the cart
 */
function removeFromCart(id: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item._id !== id);
  sessionStorage.setItem(StorageKeys.CART, JSON.stringify(cart));
  return cart;
}

/**
 * Update cart
 */
function updateCart(id: string, qty: number): Cart {
  const cart = getCart();
  const index = cart.items.findIndex((item) => item._id === id);

  if (index >= 0) {
    const updatedItem = { ...cart.items[index], qty };
    cart.items[index] = updatedItem;
    sessionStorage.setItem(StorageKeys.CART, JSON.stringify(cart));
  }

  return cart;
}
