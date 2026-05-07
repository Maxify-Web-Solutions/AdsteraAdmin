// features/smartLink/smartLinkSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./axiosConfig";


// ================= CREATE =================
export const createSmartLink = createAsyncThunk(
    "smartLink/create",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.post("/smartlink/create");

            return res.data.smartLink;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= USER LINKS =================
export const getUserSmartLinks = createAsyncThunk(
    "smartLink/getUser",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.get("/smartlink/user");

            return res.data.data;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= ALL LINKS =================
export const getAllSmartLinks = createAsyncThunk(
    "smartLink/getAll",
    async (
        {
            page = 1,
            limit = 10,
            search = "",
        },
        { rejectWithValue }
    ) => {
        try {

            const res = await api.get(
                `/smartlink/admin/smart-links?page=${page}&limit=${limit}&search=${search}`
            );

            return res.data;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= APPROVE =================
export const approveSmartLink = createAsyncThunk(
    "smartLink/approve",
    async (
        { id, redirectUrl },
        { rejectWithValue }
    ) => {
        try {

            const res = await api.put(
                `/smartlink/approve/${id}`,
                { redirectUrl }
            );

            return res.data.smartLink;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= REJECT =================
export const rejectSmartLink = createAsyncThunk(
    "smartLink/reject",
    async (id, { rejectWithValue }) => {
        try {

            const res = await api.put(
                `/smartlink/reject/${id}`
            );

            return res.data.data;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= DELETE =================
export const deleteSmartLink = createAsyncThunk(
    "smartLink/delete",
    async (id, { rejectWithValue }) => {
        try {

            await api.delete(
                `/smartlink/delete-smartlink/${id}`
            );

            return id;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= STATS =================
export const getSmartLinkStats = createAsyncThunk(
    "smartLink/stats",
    async (linkId, { rejectWithValue }) => {
        try {

            const res = await api.get(
                `/smartlink/stats/${linkId}`
            );

            return res.data;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= FILTERS =================
export const getPendingLinks = createAsyncThunk(
    "smartLink/pending",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.get(
                "/smartlink/smart-links/pending"
            );

            return res.data.data;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


export const getApprovedLinks = createAsyncThunk(
    "smartLink/approved",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.get(
                "/smartlink/smart-links/approved"
            );

            return res.data.data;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


export const getRejectedLinks = createAsyncThunk(
    "smartLink/rejected",
    async (_, { rejectWithValue }) => {
        try {

            const res = await api.get(
                "/smartlink/smart-links/rejected"
            );

            return res.data.data;

        } catch (err) {

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);


// ================= SLICE =================
const smartLinkSlice = createSlice({
    name: "smartLink",

    initialState: {
        links: [],
        pending: [],
        approved: [],
        rejected: [],

        stats: null,

        total: 0,
        page: 1,
        pages: 1,

        loading: false,
        success: null,
        error: null,
    },

    reducers: {

        clearSmartLinkState: (state) => {
            state.error = null;
            state.success = null;
        },

    },

    extraReducers: (builder) => {

        builder

            // ================= CREATE =================
            .addCase(createSmartLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createSmartLink.fulfilled, (state, action) => {

                state.loading = false;

                state.links.unshift(action.payload);

                state.success = "SmartLink created successfully";
            })

            .addCase(createSmartLink.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message || "Failed";
            })



            // ================= USER LINKS =================
            .addCase(getUserSmartLinks.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserSmartLinks.fulfilled, (state, action) => {

                state.loading = false;

                state.links = action.payload;
            })

            .addCase(getUserSmartLinks.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message || "Failed";
            })



            // ================= ALL LINKS =================
            .addCase(getAllSmartLinks.pending, (state) => {
                state.loading = true;
            })

            .addCase(getAllSmartLinks.fulfilled, (state, action) => {

                state.loading = false;

                state.links = action.payload.data;

                state.total = action.payload.total;

                state.page = action.payload.page;

                state.pages = action.payload.pages;
            })

            .addCase(getAllSmartLinks.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message || "Failed";
            })



            // ================= APPROVE =================
            .addCase(approveSmartLink.pending, (state) => {
                state.loading = true;
            })

            .addCase(approveSmartLink.fulfilled, (state, action) => {

                state.loading = false;

                const updated = action.payload;

                state.links = state.links.map((item) =>
                    item._id === updated._id
                        ? updated
                        : item
                );

                state.pending = state.pending.filter(
                    (item) => item._id !== updated._id
                );

                state.rejected = state.rejected.filter(
                    (item) => item._id !== updated._id
                );

                state.approved.unshift(updated);

                state.success = "SmartLink approved";
            })

            .addCase(approveSmartLink.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message || "Failed";
            })



            // ================= REJECT =================
            .addCase(rejectSmartLink.pending, (state) => {
                state.loading = true;
            })

            .addCase(rejectSmartLink.fulfilled, (state, action) => {

                state.loading = false;

                const updated = action.payload;

                state.links = state.links.map((item) =>
                    item._id === updated._id
                        ? updated
                        : item
                );

                state.pending = state.pending.filter(
                    (item) => item._id !== updated._id
                );

                state.approved = state.approved.filter(
                    (item) => item._id !== updated._id
                );

                state.rejected.unshift(updated);

                state.success = "SmartLink rejected";
            })

            .addCase(rejectSmartLink.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message || "Failed";
            })



            // ================= DELETE =================
            .addCase(deleteSmartLink.pending, (state) => {
                state.loading = true;
            })

            .addCase(deleteSmartLink.fulfilled, (state, action) => {

                state.loading = false;

                const id = action.payload;

                state.links = state.links.filter(
                    (item) => item._id !== id
                );

                state.pending = state.pending.filter(
                    (item) => item._id !== id
                );

                state.approved = state.approved.filter(
                    (item) => item._id !== id
                );

                state.rejected = state.rejected.filter(
                    (item) => item._id !== id
                );

                state.success = "SmartLink deleted";
            })

            .addCase(deleteSmartLink.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message || "Failed";
            })



            // ================= STATS =================
            .addCase(getSmartLinkStats.pending, (state) => {
                state.loading = true;
            })

            .addCase(getSmartLinkStats.fulfilled, (state, action) => {

                state.loading = false;

                state.stats = action.payload;
            })

            .addCase(getSmartLinkStats.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload?.message || "Failed";
            })



            // ================= PENDING =================
            .addCase(getPendingLinks.fulfilled, (state, action) => {
                state.pending = action.payload;
            })



            // ================= APPROVED =================
            .addCase(getApprovedLinks.fulfilled, (state, action) => {
                state.approved = action.payload;
            })



            // ================= REJECTED =================
            .addCase(getRejectedLinks.fulfilled, (state, action) => {
                state.rejected = action.payload;
            });

    },
});


export const {
    clearSmartLinkState,
} = smartLinkSlice.actions;

export default smartLinkSlice.reducer;