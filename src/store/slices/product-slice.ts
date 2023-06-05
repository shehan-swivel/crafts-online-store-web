import { productService } from "@/services";
import { Product, ProductQuery } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type ProductSlice = {
  all: { data: Product[]; loading: boolean };
};

const initialState: ProductSlice = {
  all: {
    data: [],
    loading: false,
  },
};

/* Products actions */
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (queryParams: ProductQuery = {}) => {
    const response = await productService.getProducts(queryParams);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Hydration between server and client side to maintain the updated state
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      state.all = action.payload.products?.all;
    });

    // Get products reducers
    builder.addCase(getProducts.pending, (state) => {
      state.all.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.all.data = payload.data;
      state.all.loading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.all.loading = false;
    });
  },
});

const { reducer } = productSlice;

export default reducer;
