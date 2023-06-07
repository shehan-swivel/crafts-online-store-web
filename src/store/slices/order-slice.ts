import { orderService } from "@/services";
import { Order } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const dummyData: Order[] = [
  {
    amount: 481.77,
    status: "PENDING",
    items: [
      {
        product: {
          _id: "647efd9632110a1658c454f2",
          name: "craft 1",
          description: "my awesome desc",
          qty: 161,
          price: 100,
          category: "CLAY",
          createdAt: "2023-06-06T09:34:14.534Z",
          updatedAt: "2023-06-07T06:04:37.346Z",
        },
        qty: 2,
      },
      {
        product: {
          _id: "647efda932110a1658c454f4",
          name: "craft 2",
          description: "my awesome desc",
          qty: 41,
          price: 450,
          category: "WOOD",
          createdAt: "2023-06-06T09:34:33.749Z",
          updatedAt: "2023-06-07T06:04:37.351Z",
        },
        qty: 1,
      },
    ],
    note: "Make this fast",
    customerName: "Kay Funk",
    phoneNumber: "94713771735",
    email: "shehanrnet@gmail.com",
    billingAddress: {
      street: "9007 Ephraim Prairie",
      city: "Port Lonieburgh",
      state: "Keithview",
      postalCode: "925",
    },
    _id: "647efdc532110a1658c454f8",
    createdAt: "2023-06-06T09:35:01.269Z",
    updatedAt: "2023-06-06T09:35:01.269Z",
  },
  {
    amount: 481.77,
    status: "PENDING",
    items: [
      {
        product: {
          _id: "647efd9632110a1658c454f2",
          name: "craft 1",
          description: "my awesome desc",
          qty: 161,
          price: 100,
          category: "CLAY",
          createdAt: "2023-06-06T09:34:14.534Z",
          updatedAt: "2023-06-07T06:04:37.346Z",
        },
        qty: 3,
      },
      {
        product: {
          _id: "647efda932110a1658c454f4",
          name: "craft 2",
          description: "my awesome desc",
          qty: 41,
          price: 450,
          category: "WOOD",
          createdAt: "2023-06-06T09:34:33.749Z",
          updatedAt: "2023-06-07T06:04:37.351Z",
        },
        qty: 1,
      },
    ],
    note: "Make this fast",
    customerName: "Kay Funk",
    phoneNumber: "94713771735",
    email: "shehanrnet@gmail.com",
    billingAddress: {
      street: "9007 Ephraim Prairie",
      city: "Port Lonieburgh",
      state: "Keithview",
      postalCode: "925",
    },
    _id: "647efdc532110a1658c454f9",
    createdAt: "2023-06-06T09:35:01.269Z",
    updatedAt: "2023-06-06T09:35:01.269Z",
  },
];

type OrderSlice = {
  all: { data: Order[]; loading: boolean };
};

const initialState: OrderSlice = {
  all: {
    data: [...dummyData],
    loading: false,
  },
};

/* Orders actions */
export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  const response = await orderService.getOrders();
  return response.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Hydration between server and client side to maintain the updated state
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      state.all = action.payload.orders?.all;
    });

    // Get orders reducers
    builder.addCase(getOrders.pending, (state) => {
      state.all.loading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.all.data = payload.data;
      state.all.loading = false;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.all.loading = false;
    });
  },
});

const { reducer } = orderSlice;

export default reducer;
