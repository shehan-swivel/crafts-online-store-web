import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import productReducer from "./slices/product-slice";
import orderReducer from "./slices/order-slice";
import cartReducer from "./slices/cart-slice";
import statReducer from "./slices/stat-slice";

const store = () =>
  configureStore({
    reducer: {
      products: productReducer,
      orders: orderReducer,
      cart: cartReducer,
      stats: statReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(store);
