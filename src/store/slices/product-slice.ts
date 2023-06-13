import { ProductCategory } from "@/constants";
import { productService } from "@/services";
import { Product, ProductQuery } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type ProductSlice = {
  all: { data: Product[]; loading: boolean };
  query: { name: string; category: ProductCategory | null };
  submit: { loading: boolean; success: boolean };
};

const initialState: ProductSlice = {
  all: {
    data: [],
    loading: false,
  },
  query: {
    name: "",
    category: null,
  },
  submit: {
    loading: false,
    success: false,
  },
};

/* Products actions */
export const getProducts = createAsyncThunk("products/getProducts", async (queryParams?: ProductQuery) => {
  const response = await productService.getProducts(queryParams);
  return response.data;
});

export const addProduct = createAsyncThunk("employees/addProduct", async (data: FormData, thunkAPI) => {
  try {
    const response = await productService.addProduct(data);
    // thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
    return response.data;
  } catch (error: any) {
    // thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
    throw error;
  }
});

export const getProductById = createAsyncThunk("employees/getProductById", async (id: string) => {
  const response = await productService.getProductById(id);
  return response.data;
});

export const updateProduct = createAsyncThunk(
  "employees/updateProduct",
  async ({ id, data }: { id: string; data: FormData }, thunkAPI) => {
    try {
      const response = await productService.updateProduct(id, data);
      // thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
      return response.data;
    } catch (error: any) {
      // thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk("employees/deleteProduct", async (id: string, thunkAPI) => {
  try {
    const response = await productService.deleteProduct(id);
    // thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
    return id;
  } catch (error: any) {
    // thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
    throw error;
  }
});

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

    // Add product reducers
    builder.addCase(addProduct.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.all.data.push(payload.data);
      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });

    // Update product reducers
    builder.addCase(updateProduct.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      const index = state.all.data.findIndex((el) => el._id === payload.data._id);
      if (index >= 0) {
        state.all.data[index] = payload.data;
      }

      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });

    // Delete product reducers
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.all.data = state.all.data.filter((el) => el._id !== payload);
    });
  },
});

const { reducer } = productSlice;

export default reducer;
