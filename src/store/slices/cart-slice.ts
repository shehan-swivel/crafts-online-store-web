import { cartService } from "@/services";
import { Cart, CartItem } from "@/types/cart-types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type CartSlice = Cart;

const initialState: CartSlice = {
  items: [
    {
      _id: "1",
      name: "Craft 1",
      description: "",
      price: 100,
      qty: 1,
      image: "",
    },
    {
      _id: "2",
      name: "Craft 2",
      description: "",
      price: 500,
      qty: 3,
      image: "",
    },
    {
      _id: "3",
      name: "Craft 3",
      description: "",
      price: 1290,
      qty: 1,
      image: "",
    },
  ],
};

/* Cart actions */
export const getCart = createAsyncThunk("cart/getCart", () => {
  const response = cartService.getCart();
  return response;
});

export const addToCart = createAsyncThunk("cart/addToCart", (item: CartItem) => {
  const response = cartService.addToCart(item);
  return response;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", (id: string) => {
  const response = cartService.removeFromCart(id);
  return response;
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  ({ id, qty }: { id: string; qty: number }) => {
    const response = cartService.updateCart(id, qty);
    return response;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Hydration between server and client side to maintain the updated state
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      state = action.payload.cart;
    });

    // Get cart reducers
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state = payload;
    });

    // Add to cart reducers
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state = payload;
    });

    // Remove from cart reducers
    builder.addCase(removeFromCart.fulfilled, (state, { payload }) => {
      state = payload;
    });

    // Update cart reducers
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state = payload;
    });
  },
});

const { reducer } = CartSlice;

export default reducer;
