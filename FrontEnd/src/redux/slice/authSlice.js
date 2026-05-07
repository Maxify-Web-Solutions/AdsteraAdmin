// redux/slice/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axiosConfig";


/* =========================
   REGISTER USER
========================= */
export const registerUser = createAsyncThunk(
    "auth/register",
    async (
        {
            name,
            email,
            mobile,
            password,
        },
        { rejectWithValue }
    ) => {
        try {

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    mobile,
                    password,
                }
            );

            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Registration failed" }
            );
        }
    }
);



/* =========================
   LOGIN USER
========================= */
export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        {
            email,
            password,
        },
        { rejectWithValue }
    ) => {
        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Login failed" }
            );
        }
    }
);



/* =========================
   GET PROFILE
========================= */
export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.get(
                "/auth/profile"
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Profile fetch failed" }
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

            const res = await api.post(
                "/auth/logout"
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Logout failed" }
            );
        }
    }
);



/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.get(
                "/auth/all-users"
            );

            return res.data.users;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Users fetch failed" }
            );
        }
    }
);



/* =========================
   UPDATE USER
========================= */
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (
        {
            userId,
            name,
            email,
            mobile,
        },
        { rejectWithValue }
    ) => {
        try {

            const res = await api.put(
                `/auth/update/${userId}`,
                {
                    name,
                    email,
                    mobile,
                }
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Update failed" }
            );
        }
    }
);



/* =========================
   BLOCK USER
========================= */
export const blockUser = createAsyncThunk(
    "auth/blockUser",
    async (userId, { rejectWithValue }) => {
        try {

            const res = await api.put(
                `/auth/block/${userId}`
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Block failed" }
            );
        }
    }
);



/* =========================
   UNBLOCK USER
========================= */
export const unblockUser = createAsyncThunk(
    "auth/unblockUser",
    async (userId, { rejectWithValue }) => {
        try {

            const res = await api.put(
                `/auth/unblock/${userId}`
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Unblock failed" }
            );
        }
    }
);



/* =========================
   DELETE USER
========================= */
export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async (id, { rejectWithValue }) => {
        try {

            const res = await api.delete(
                `/auth/delete/${id}`
            );

            return {
                id,
                ...res.data,
            };

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                { message: "Delete failed" }
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

    users: [],

    error: null,

    success: null,

    isAuthChecked: false,
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
        },

        clearSuccess: (state) => {
            state.success = null;
        },

    },



    extraReducers: (builder) => {

        builder



            /* ================= REGISTER ================= */
            .addCase(registerUser.pending, (state) => {

                state.loading = true;

                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload.user;

                state.success =
                    action.payload.message ||
                    "Registration successful";

                state.isAuthChecked = true;
            })

            .addCase(registerUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            })



            /* ================= LOGIN ================= */
            .addCase(loginUser.pending, (state) => {

                state.loading = true;

                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload.user;

                state.success =
                    action.payload.message ||
                    "Login successful";

                state.isAuthChecked = true;
            })

            .addCase(loginUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            })



            /* ================= PROFILE ================= */
            .addCase(getProfile.pending, (state) => {

                state.loading = true;
            })

            .addCase(getProfile.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload.user;

                state.isAuthChecked = true;
            })

            .addCase(getProfile.rejected, (state, action) => {

                state.loading = false;

                state.user = null;

                state.error =
                    action.payload?.message;

                state.isAuthChecked = true;
            })



            /* ================= LOGOUT ================= */
            .addCase(logoutUser.pending, (state) => {

                state.loading = true;
            })

            .addCase(logoutUser.fulfilled, (state, action) => {

                state.loading = false;

                state.user = null;

                state.users = [];

                state.success =
                    action.payload.message ||
                    "Logout successful";
            })

            .addCase(logoutUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            })



            /* ================= GET USERS ================= */
            .addCase(getAllUsers.pending, (state) => {

                state.loading = true;
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {

                state.loading = false;

                state.users = action.payload;
            })

            .addCase(getAllUsers.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            })



            /* ================= UPDATE USER ================= */
            .addCase(updateUser.pending, (state) => {

                state.loading = true;

                state.error = null;
            })

            .addCase(updateUser.fulfilled, (state, action) => {

                state.loading = false;

                const updatedUser = action.payload.user;

                state.success =
                    action.payload.message;

                // logged in user update
                if (
                    state.user &&
                    state.user._id === updatedUser._id
                ) {
                    state.user = updatedUser;
                }

                // users list update
                state.users = state.users.map((user) =>
                    user._id === updatedUser._id
                        ? updatedUser
                        : user
                );
            })

            .addCase(updateUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            })



            /* ================= BLOCK USER ================= */
            .addCase(blockUser.pending, (state) => {

                state.loading = true;
            })

            .addCase(blockUser.fulfilled, (state, action) => {

                state.loading = false;

                const updatedUser = action.payload.user;

                state.success =
                    action.payload.message;

                state.users = state.users.map((user) =>
                    user._id === updatedUser._id
                        ? updatedUser
                        : user
                );

                if (
                    state.user?._id === updatedUser._id
                ) {
                    state.user = updatedUser;
                }
            })

            .addCase(blockUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            })



            /* ================= UNBLOCK USER ================= */
            .addCase(unblockUser.pending, (state) => {

                state.loading = true;
            })

            .addCase(unblockUser.fulfilled, (state, action) => {

                state.loading = false;

                const updatedUser = action.payload.user;

                state.success =
                    action.payload.message;

                state.users = state.users.map((user) =>
                    user._id === updatedUser._id
                        ? updatedUser
                        : user
                );

                if (
                    state.user?._id === updatedUser._id
                ) {
                    state.user = updatedUser;
                }
            })

            .addCase(unblockUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            })



            /* ================= DELETE USER ================= */
            .addCase(deleteUser.pending, (state) => {

                state.loading = true;
            })

            .addCase(deleteUser.fulfilled, (state, action) => {

                state.loading = false;

                state.success =
                    action.payload.message;

                state.users = state.users.filter(
                    (user) =>
                        user._id !== action.payload.id
                );

                if (
                    state.user?._id === action.payload.id
                ) {
                    state.user = null;
                }
            })

            .addCase(deleteUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message;
            });

    },

});



export const {
    clearError,
    clearSuccess,
} = authSlice.actions;

export default authSlice.reducer;