// redux/slice/configSlice.js

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { api } from "./axiosConfig";

// ==========================
// 🔐 UPDATE CONFIG (ADMIN)
// ==========================

export const updateConfig =
  createAsyncThunk(
    "config/updateConfig",
    async (
      payload,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await api.put(
  "/admin/adsterra-key",
  payload
);

        return res.data;
      } catch (err) {
        return rejectWithValue(
          err.response?.data ||
            err.message
        );
      }
    }
  );

// ==========================
// 🌐 GET CONFIG
// ==========================

export const getConfig =
  createAsyncThunk(
    "config/getConfig",
    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await api.get(
            "/config/adsterra-key"
          );

        return res.data;
      } catch (err) {
        return rejectWithValue(
          err.response?.data ||
            err.message
        );
      }
    }
  );

// ==========================
// SLICE
// ==========================

const configSlice =
  createSlice({
    name: "config",

    initialState: {
      config: null,

      loading: false,
      updateLoading: false,

      success: false,

      message: "",

      error: null,
    },

    reducers: {
      clearConfigState:
        (state) => {
          state.loading = false;

          state.updateLoading = false;

          state.success = false;

          state.error = null;

          state.message = "";
        },
    },

    extraReducers: (
      builder
    ) => {
      builder

        // ==========================
        // 🔐 UPDATE CONFIG
        // ==========================

        .addCase(
          updateConfig.pending,
          (state) => {
            state.updateLoading = true;

            state.success = false;

            state.error = null;
          }
        )

        .addCase(
          updateConfig.fulfilled,
          (
            state,
            action
          ) => {
            state.updateLoading = false;

            state.success = true;

            state.message =
              action.payload.message;

            state.config =
              action.payload.data;
          }
        )

        .addCase(
          updateConfig.rejected,
          (
            state,
            action
          ) => {
            state.updateLoading = false;

            state.success = false;

            state.error =
              action.payload
                ?.message ||
              "Failed to update config";
          }
        )

        // ==========================
        // 🌐 GET CONFIG
        // ==========================

        .addCase(
          getConfig.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          }
        )

        .addCase(
          getConfig.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.config =
              action.payload.data;
          }
        )

        .addCase(
          getConfig.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload
                ?.message ||
              "Failed to fetch config";
          }
        );
    },
  });

export const {
  clearConfigState,
} = configSlice.actions;

export default configSlice.reducer;