// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import levelSlice from "./slices/levelSlice";
import subjectReducer from "./slices/subjectSlice";
import materialReducer from "./slices/materialSlice";
import summerySlice from "./slices/summerySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    levels: levelSlice,
    subjects: subjectReducer, 
    materials: materialReducer,
    summery: summerySlice,
 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
