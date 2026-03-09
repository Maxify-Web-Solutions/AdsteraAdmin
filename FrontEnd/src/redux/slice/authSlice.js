import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axiosConfig";

/* =========================
   REGISTER USER
========================= */
export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ name, email, mobile, password }, { rejectWithValue }) => {
        try {

            const response = await api.post("/auth/register", {
                name,
                email,
                mobile,
                password
            });

            return response.data.user;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );

        }
    }
);


/* =========================
   LOGIN USER
========================= */
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            return response.data.user;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );

        }
    }
);


/* =========================
   GET LOGGED-IN USER
========================= */
export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.get("/auth/profile");

            return res.data.user;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "User fetch failed"
            );

        }
    }
);


/* =========================
   LOGOUT USER
========================= */
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {

            await api.post("/auth/logout");

            return true;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );

        }
    }
);


/* =========================
   INITIAL STATE
========================= */
const initialState = {
    loading: false,
    user: null,
    error: null,
    isAuthChecked: false
};


/* =========================
   SLICE
========================= */
const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        clearError: (state) => {
            state.error = null;
        }

    },

    extraReducers: (builder) => {

        builder

            /* ===== REGISTER ===== */
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthChecked = true;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            /* ===== LOGIN ===== */
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthChecked = true;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            /* ===== GET PROFILE ===== */
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthChecked = true;
            })

            .addCase(getProfile.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthChecked = true;
            })


            /* ===== LOGOUT ===== */
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }

});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;