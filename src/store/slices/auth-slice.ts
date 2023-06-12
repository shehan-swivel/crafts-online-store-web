import { authService } from "@/services";
import { User } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type AuthSlice = {
  user: User | null;
};

const initialState: AuthSlice = {
  user: null,
};

/* Auth actions */
export const getCurrentUser = createAsyncThunk("products/getCurrentUser", async () => {
  const response = await authService.getCurrentUser();
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Hydration between server and client side to maintain the updated state
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      state.user = action.payload.user;
    });

    // Get current user reducers
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
    });
  },
});

const { reducer } = authSlice;

export default reducer;
