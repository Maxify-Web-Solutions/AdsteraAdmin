import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slice/adminSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer
  }
});