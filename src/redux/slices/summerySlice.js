import { createSlice } from "@reduxjs/toolkit";

const summerySlice = createSlice({
  name: "summery",
  initialState: {
    value: "",
  },
  reducers: {
    setSummery: (state, action) => {
      state.value = action.payload;
    },
    clearSummery: (state) => {
      state.value = "";
    },
  },
});

export const { setSummery, clearSummery } = summerySlice.actions;
export default summerySlice.reducer;