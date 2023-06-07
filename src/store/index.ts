import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import productReducer from "./slices/product-slice";
import orderReducer from "./slices/order-slice";

const store = () =>
  configureStore({
    reducer: {
      products: productReducer,
      orders: orderReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(store);
