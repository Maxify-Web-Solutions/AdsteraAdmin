import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axiosConfig";

export const getUsers = createAsyncThunk(
    "admin/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/auth/admin/users");
            return res.data.users;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false
    },
    extraReducers: (builder) => {

        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });

        builder.addCase(getUsers.rejected, (state) => {
            state.loading = false;
        });

    }
});

export default adminSlice.reducer;