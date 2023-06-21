import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import productReducer from "./slices/product-slice";
import orderReducer from "./slices/order-slice";
import cartReducer from "./slices/cart-slice";
import statReducer from "./slices/stat-slice";
import uiReducer from "./slices/ui-slice";

const rootReducer = combineReducers({
  products: productReducer,
  orders: orderReducer,
  cart: cartReducer,
  stats: statReducer,
  ui: uiReducer,
});

const store = () =>
  configureStore({
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(store);
