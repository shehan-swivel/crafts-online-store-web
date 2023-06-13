import { orderService } from "@/services";
import { Order } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { clearCart } from "./cart-slice";
import { OrderStatus } from "@/constants";

type OrderSlice = {
  all: { data: Order[]; loading: boolean };
  submit: { loading: boolean; success: boolean };
};

const initialState: OrderSlice = {
  all: {
    data: [],
    loading: false,
  },
  submit: {
    loading: false,
    success: false,
  },
};

/* Orders actions */
export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  const response = await orderService.getOrders();
  return response.data;
});

export const createOrder = createAsyncThunk("orders/createOrder", async (data: Order, { dispatch }) => {
  try {
    const response = await orderService.createOrder(data);
    await dispatch(clearCart()); // Clear cart after successful submission
    // thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
    return response.data;
  } catch (error: any) {
    // thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
    throw error;
  }
});

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }: { id: string; status: OrderStatus }, thunkAPI) => {
    try {
      const response = await orderService.updateOrderStatus(id, status);
      // thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
      return response.data;
    } catch (error: any) {
      // thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
      throw error;
    }
  }
);

export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id: string, thunkAPI) => {
  try {
    const response = await orderService.deleteOrder(id);
    // thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
    return id;
  } catch (error: any) {
    // thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
    throw error;
  }
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

    // Create order reducers
    builder.addCase(createOrder.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });

    // Update order status reducers
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
      const index = state.all.data.findIndex((el) => el._id === payload.data._id);
      if (index >= 0) {
        state.all.data[index] = payload.data;
      }

      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });

    // Delete order reducers
    builder.addCase(deleteOrder.fulfilled, (state, { payload }) => {
      state.all.data = state.all.data.filter((el) => el._id !== payload);
    });
  },
});

const { reducer } = orderSlice;

export default reducer;
