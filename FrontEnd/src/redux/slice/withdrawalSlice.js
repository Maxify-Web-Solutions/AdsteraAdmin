// redux/slice/withdrawalSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axiosConfig";


// ==========================================
// ✅ GET MY WITHDRAWALS
// ==========================================
export const getMyWithdrawals = createAsyncThunk(
    "withdrawal/getMyWithdrawals",

    async (userId, thunkAPI) => {
        try {

            const res = await api.get(`/withdrawal/${userId}`);

            return res.data.withdrawals;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch withdrawals"
            );
        }
    }
);


// ==========================================
// ✅ GET ALL WITHDRAWALS (ADMIN)
// ==========================================
export const getAllWithdrawals = createAsyncThunk(
    "withdrawal/getAllWithdrawals",

    async (_, thunkAPI) => {
        try {

            const res = await api.get(`/withdrawal/all`);

            return res.data.withdrawals;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch all withdrawals"
            );
        }
    }
);


// ==========================================
// ✅ UPDATE WITHDRAWAL STATUS
// ==========================================
export const updateWithdrawalStatus = createAsyncThunk(
    "withdrawal/updateWithdrawalStatus",

    async (data, thunkAPI) => {
        try {

            const res = await api.put(`/withdrawal/update`, data);

            return res.data.withdrawal;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update withdrawal"
            );
        }
    }
);



// ==========================================
// ✅ SLICE
// ==========================================
const withdrawalSlice = createSlice({
    name: "withdrawal",

    initialState: {
        myWithdrawals: [],
        allWithdrawals: [],

        loading: false,
        success: false,
        error: null,
    },

    reducers: {

        clearWithdrawalState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },

    },

    extraReducers: (builder) => {

        // ======================================
        // ✅ GET MY WITHDRAWALS
        // ======================================
        builder
            .addCase(getMyWithdrawals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getMyWithdrawals.fulfilled, (state, action) => {
                state.loading = false;
                state.myWithdrawals = action.payload;
            })

            .addCase(getMyWithdrawals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



        // ======================================
        // ✅ GET ALL WITHDRAWALS
        // ======================================
        builder
            .addCase(getAllWithdrawals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllWithdrawals.fulfilled, (state, action) => {
                state.loading = false;
                state.allWithdrawals = action.payload;
            })

            .addCase(getAllWithdrawals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



        // ======================================
        // ✅ UPDATE WITHDRAWAL STATUS
        // ======================================
        builder
            .addCase(updateWithdrawalStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateWithdrawalStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                // ✅ Update admin list
                state.allWithdrawals = state.allWithdrawals.map((item) =>
                    item._id === action.payload._id
                        ? action.payload
                        : item
                );

                // ✅ Update user list
                state.myWithdrawals = state.myWithdrawals.map((item) =>
                    item._id === action.payload._id
                        ? action.payload
                        : item
                );
            })

            .addCase(updateWithdrawalStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});


// ==========================================
// ✅ EXPORTS
// ==========================================
export const {
    clearWithdrawalState,
} = withdrawalSlice.actions;

export default withdrawalSlice.reducer;