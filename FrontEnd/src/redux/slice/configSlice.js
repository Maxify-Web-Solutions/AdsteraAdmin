// redux/slice/configSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axiosConfig"; // axios instance

// ==========================
// 🔐 Update API Key (Admin)
// ==========================
export const updateAdsterraKey = createAsyncThunk(
  "config/updateKey",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/admin/adsterra-key", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================
// 🌐 Get API Key
// ==========================
export const getAdsterraKey = createAsyncThunk(
  "config/getKey",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/config/adsterra-key");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================
// Slice
// ==========================
const configSlice = createSlice({
  name: "config",
  initialState: {
    apiKey: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearConfigState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔐 UPDATE
      .addCase(updateAdsterraKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdsterraKey.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateAdsterraKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🌐 GET
      .addCase(getAdsterraKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdsterraKey.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKey = action.payload.adsterraApiKey;
      })
      .addCase(getAdsterraKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearConfigState } = configSlice.actions;
export default configSlice.reducer;