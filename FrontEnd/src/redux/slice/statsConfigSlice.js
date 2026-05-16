// redux/slice/statsConfigSlice.js

import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { api } from "./axiosConfig";

// ==========================================
// ✅ GET STATS CONFIG
// ==========================================

export const getStatsConfig =
    createAsyncThunk(
        "statsConfig/getStatsConfig",

        async (_, thunkAPI) => {
            try {
                const res =
                    await api.get(
                        "/stats-config/get"
                    );

                return res.data.data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data
                        ?.message ||
                        "Failed to fetch stats config"
                );
            }
        }
    );

// ==========================================
// ✅ SAVE STATS CONFIG
// ==========================================

export const saveStatsConfig =
    createAsyncThunk(
        "statsConfig/saveStatsConfig",

        async (
            payload,
            thunkAPI
        ) => {
            try {
                const res =
                    await api.post(
                        "/stats-config/save",
                        payload
                    );

                return res.data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data
                        ?.message ||
                        "Failed to save stats config"
                );
            }
        }
    );

// ==========================================
// ✅ SLICE
// ==========================================

const statsConfigSlice =
    createSlice({
        name: "statsConfig",

        initialState: {
            config: null,

            loading: false,

            success: false,

            message: null,

            error: null,
        },

        reducers: {
            clearStatsConfigState:
                (state) => {
                    state.loading =
                        false;

                    state.success =
                        false;

                    state.message =
                        null;

                    state.error =
                        null;
                },
        },

        extraReducers: (
            builder
        ) => {
            // ======================================
            // ✅ GET CONFIG
            // ======================================

            builder
                .addCase(
                    getStatsConfig.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    getStatsConfig.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.config =
                            action.payload;
                    }
                )

                .addCase(
                    getStatsConfig.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload;
                    }
                );

            // ======================================
            // ✅ SAVE CONFIG
            // ======================================

            builder
                .addCase(
                    saveStatsConfig.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.success =
                            false;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    saveStatsConfig.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.success =
                            true;

                        state.message =
                            action.payload.message;

                        state.config =
                            action.payload.data;
                    }
                )

                .addCase(
                    saveStatsConfig.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload;
                    }
                );
        },
    });

// ==========================================
// ✅ EXPORTS
// ==========================================

export const {
    clearStatsConfigState,
} = statsConfigSlice.actions;

export default statsConfigSlice.reducer;