import { cartService } from "@/services";
import { Product } from "@/types";
import { Cart } from "@/types/cart-types";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../index";
import { showSnackbar } from "./ui-slice";

type CartSlice = {
  cart: Cart;
  shippingCost: number | string;
  paymentMethod: string;
};

const initialState: CartSlice = {
  cart: {
    items: [],
  },
  shippingCost: "Free", // Shipping cost is hardcoded as this version does not handle shipping costs
  paymentMethod: "Cash on Delivery", // Payment method is hardcoded as this version does not handle different payment methods
};

/* Cart actions */
export const getCart = createAsyncThunk("cart/getCart", () => {
  const response = cartService.getCart();
  return response;
});

export const addToCart = createAsyncThunk("cart/addToCart", (item: Product, { dispatch }) => {
  const response = cartService.addToCart(item);
  dispatch(showSnackbar({ message: "Item added to cart", severity: "success" }));
  return response;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", (id: string, { dispatch }) => {
  const response = cartService.removeFromCart(id);
  dispatch(showSnackbar({ message: "Item removed from the cart", severity: "success" }));
  return response;
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  ({ id, qty }: { id: string; qty: number }, { dispatch }) => {
    const response = cartService.updateCart(id, qty);
    dispatch(showSnackbar({ message: "Cart updated", severity: "success" }));
    return response;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", () => {
  const response = cartService.clearCart();
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get cart reducers
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });

    // Add to cart reducers
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });

    // Remove from cart reducers
    builder.addCase(removeFromCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });

    // Update cart reducers
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });

    // Clear cart
    builder.addCase(clearCart.fulfilled, (state, { payload }) => {
      state.cart = { items: [] };
    });
  },
});

// Selectors
const cartItems = (state: AppState) => state.cart.cart.items;

export const cartTotalPriceSelector = createSelector([cartItems], (items) => {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
});

const { reducer } = cartSlice;

export default reducer;
