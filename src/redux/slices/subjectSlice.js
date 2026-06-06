// redux/slices/subjectSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubjectsByLevelService } from "../services/subjectService";

const initialState = {
  subjects: [],
  loading: false,
  error: null,
  fetched: false,
};



// GET Subjects by Level
export const getSubjectsByLevel = createAsyncThunk(
  "subjects/getSubjectsByLevel",
  async ({ levelId, department }, thunkAPI) => {
    try {
      const data = await getSubjectsByLevelService(levelId, department);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch subjects"
      );
    }
  }
);


const subjectSlice = createSlice({
  name: "subjects",
  initialState,

  reducers: {

    clearSubjects: (state) => {
      state.subjects = [];
      state.fetched = false;
      state.error = null;
    },

  },

  extraReducers: (builder) => {

    builder

      // Pending
      .addCase(getSubjectsByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })



      // Success
      .addCase(getSubjectsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
        state.fetched = true;
      })



      // Error
      .addCase(getSubjectsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});



export const { clearSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;