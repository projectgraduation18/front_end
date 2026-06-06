// redux/slices/levelSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLevelsService } from "../services/levelService";

const initialState = {
  levels: [],
  loading: false,
  error: null,
  fetched: false,      // 👈 caching flag
  lastFetched: null,   // 👈 اختياري أقوى للكاش
};



// GET Levels
export const getLevels = createAsyncThunk(
  "levels/getLevels",
  async (_, thunkAPI) => {
    try {
      const data = await getLevelsService();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch levels"
      );
    }
  }
);




const levelSlice = createSlice({
  name: "levels",
  initialState,

  reducers: {

    // 👇 optional: reset cache
    clearLevelsCache: (state) => {
      state.levels = [];
      state.fetched = false;
      state.lastFetched = null;
    },

  },

  extraReducers: (builder) => {

    builder

      // Pending
      .addCase(getLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })



      // Success
      .addCase(getLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = action.payload;

        state.fetched = true;          // 👈 مهم للكاش
        state.lastFetched = Date.now(); // 👈 تحسين إضافي
      })



      // Error
      .addCase(getLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});



export const { clearLevelsCache } = levelSlice.actions;

export default levelSlice.reducer;