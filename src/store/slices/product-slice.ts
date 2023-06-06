import { ProductCategory } from "@/constants";
import { productService } from "@/services";
import { Product, ProductQuery } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const dummyData: Product[] = [
  {
    _id: "1",
    name: "Craft 1",
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots",
    qty: 23,
    price: 1750.0,
    category: "TEXTILES",
    image: "https://picsum.photos/id/2/200/300",
  },
  {
    _id: "2",
    name: "Craft 2",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be",
    qty: 23,
    price: 890.0,
    category: "WOOD",
    image: "https://picsum.photos/id/1/200/300",
  },
];

type ProductSlice = {
  all: { data: Product[]; loading: boolean };
  query: { name: string; category: ProductCategory | null };
};

const initialState: ProductSlice = {
  all: {
    data: [...dummyData],
    loading: false,
  },
  query: {
    name: "",
    category: null,
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
