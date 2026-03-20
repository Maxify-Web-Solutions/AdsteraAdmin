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
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ================= GET USER LINKS =================
export const getUserSmartLinks = createAsyncThunk(
    "smartLink/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/smartlink/my-links");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ================= APPROVE =================
export const approveSmartLink = createAsyncThunk(
    "smartLink/approve",
    async ({ id, redirectUrl }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/smartlink/approve/${id}`, { redirectUrl });
            return res.data.smartLink;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ================= REJECT =================
export const rejectSmartLink = createAsyncThunk(
    "smartLink/reject",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.put(`/smartlink/reject/${id}`);
            return res.data.smartLink;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ================= STATS =================
export const getSmartLinkStats = createAsyncThunk(
    "smartLink/stats",
    async (linkId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/smartlink/stats/${linkId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ================= STATUS (⚠️ FIXED PATHS) =================
export const getPendingLinks = createAsyncThunk(
    "smartLink/pending",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/smartlink/smart-links/pending"); // ✅ FIX
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const getApprovedLinks = createAsyncThunk(
    "smartLink/approved",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/smartlink/smart-links/approved"); // ✅ FIX
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const getRejectedLinks = createAsyncThunk(
    "smartLink/rejected",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/smartlink/smart-links/rejected"); // ✅ FIX
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
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
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createSmartLink.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSmartLink.fulfilled, (state, action) => {
                state.loading = false;
                state.links.unshift(action.payload);
            })
            .addCase(createSmartLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // USER LINKS
            .addCase(getUserSmartLinks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserSmartLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.links = action.payload;
            })
            .addCase(getUserSmartLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // APPROVE
            .addCase(approveSmartLink.fulfilled, (state, action) => {
                state.links = state.links.map((link) =>
                    link._id === action.payload._id ? action.payload : link
                );
                state.pending = state.pending.filter((link) => link._id !== action.payload._id);
                state.approved.unshift(action.payload);
            })
            
            // REJECT
            .addCase(rejectSmartLink.fulfilled, (state, action) => {
                state.links = state.links.map((link) =>
                    link._id === action.payload._id ? action.payload : link
                );
                state.pending = state.pending.filter((link) => link._id !== action.payload._id);
                state.rejected.unshift(action.payload);
            })

            // STATS
            .addCase(getSmartLinkStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            })

            // STATUS
            .addCase(getPendingLinks.fulfilled, (state, action) => {
                state.pending = action.payload;
            })
            .addCase(getApprovedLinks.fulfilled, (state, action) => {
                state.approved = action.payload;
            })
            .addCase(getRejectedLinks.fulfilled, (state, action) => {
                state.rejected = action.payload;
            });
    },
});

export default smartLinkSlice.reducer;