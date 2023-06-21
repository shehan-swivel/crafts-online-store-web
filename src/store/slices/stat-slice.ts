import { statService } from "@/services";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type StatSlice = {
  analytics: { data: any; loading: boolean };
};

const initialState: StatSlice = {
  analytics: {
    data: null,
    loading: false,
  },
};

/* Stats actions */
export const getAnalytics = createAsyncThunk("stats/getAnalytics", async () => {
  const response = await statService.getAnalytics();
  return response.data;
});

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Hydration between server and client side to maintain the updated state
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      state.analytics = action.payload.stats?.analytics;
    });

    // Get analytics reducers
    builder.addCase(getAnalytics.pending, (state) => {
      state.analytics.loading = true;
    });
    builder.addCase(getAnalytics.fulfilled, (state, { payload }) => {
      state.analytics.data = payload.data;
      state.analytics.loading = false;
    });
    builder.addCase(getAnalytics.rejected, (state) => {
      state.analytics.loading = false;
    });
  },
});

const { reducer } = statSlice;

export default reducer;
