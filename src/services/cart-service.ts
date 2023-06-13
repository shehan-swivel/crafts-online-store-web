import { StorageKeys } from "@/constants";
import { Product } from "@/types";
import { Cart } from "@/types/cart-types";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie-utils";

/* 
  The cart service in this application utilizes Cookies as the data storage method 
  since customer accounts are not maintained in the database. In the future, if customer accounts 
  are added to the application, these functions can be easily replaced with appropriate APIs. 
*/
export const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
};

/**
 * Get cart details
 */
function getCart(): Cart {
  const cart = getCookie(StorageKeys.CART);
  return cart ? JSON.parse(cart) : { items: [] };
}

/**
 * Add new item to the cart
 */
function addToCart(newItem: Product): Cart {
  let cart = getCart();

  // Find if item already exists in the cart
  const cartItem = cart.items.find((item) => item._id === newItem._id);

  if (cartItem && cartItem._id) {
    cart = updateCart(cartItem._id, cartItem.qty + 1);
  } else {
    newItem = { ...newItem, qty: 1 };
    cart.items.push(newItem);
    setCookie(StorageKeys.CART, JSON.stringify(cart), { expires: 7 });
  }

  return cart;
}

/**
 * Remove an item from the cart
 */
function removeFromCart(id: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item._id !== id);
  setCookie(StorageKeys.CART, JSON.stringify(cart), { expires: 7 });
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
    setCookie(StorageKeys.CART, JSON.stringify(cart), { expires: 7 });
  }

  return cart;
}

/**
 * Clear cart
 */
function clearCart(): null {
  removeCookie(StorageKeys.CART);
  return null;
}
