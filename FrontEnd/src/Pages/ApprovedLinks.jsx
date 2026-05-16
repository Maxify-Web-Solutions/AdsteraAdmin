import React, {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    getApprovedLinks,
    editSmartLink,
    deleteSmartLink,
} from "../redux/slice/smartlinkSlice";

import {
    FaSearch,
    FaCopy,
    FaExternalLinkAlt,
    FaRegCalendarAlt,
    FaUser,
    FaLink,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

import Swal from "sweetalert2";

const ApprovedLinks = () => {
    const dispatch = useDispatch();

    const {
        approved,
        loading,
        error,
    } = useSelector(
        (state) => state.smartLink
    );

    const [searchTerm, setSearchTerm] =
        useState("");

    // ==========================================
    // EDIT STATES
    // ==========================================

    const [editModal, setEditModal] =
        useState(false);

    const [selectedLink, setSelectedLink] =
        useState(null);

    const [editData, setEditData] =
        useState({
            placementId: "",
            redirectUrl: "",
        });

    // ==========================================
    // FETCH APPROVED LINKS
    // ==========================================

    useEffect(() => {
        dispatch(getApprovedLinks());
    }, [dispatch]);

    const links = approved || [];

    // ==========================================
    // FILTER LINKS
    // ==========================================

    const filteredLinks = links.filter(
        (link) =>
            link.name
                ?.toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                ) ||
            link.userId?.name
                ?.toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                ) ||
            link.userId?.email
                ?.toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                ) ||
            link.linkId
                ?.toString()
                .includes(searchTerm)
    );

    // ==========================================
    // COPY LINK
    // ==========================================

    const handleCopy = (text) => {
        if (!text) return;

        navigator.clipboard.writeText(
            text
        );

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "#1e293b",
            color: "#fff",
        });

        Toast.fire({
            icon: "success",
            title:
                "Copied to clipboard",
        });
    };

// ==========================================
// HANDLE EDIT OPEN
// ==========================================

const handleEditOpen = (item) => {

    setSelectedLink(item);

    setEditData({
        placementId:
            item.placementId || "",

        redirectUrl:
            item.redirectUrl || "",
    });

    setEditModal(true);
};

// ==========================================
// HANDLE EDIT SAVE
// ==========================================

const handleEditSave =
    async () => {

        const result =
            await Swal.fire({
                title:
                    "Update SmartLink?",

                text:
                    "Changes will be saved.",

                icon: "question",

                showCancelButton: true,

                confirmButtonColor:
                    "#10b981",

                cancelButtonColor:
                    "#ef4444",

                confirmButtonText:
                    "Yes, Update",

                background:
                    "#0f172a",

                color: "#fff",
            });

        if (!result.isConfirmed)
            return;

        dispatch(
            editSmartLink({
                id: selectedLink._id,

                placementId:
                    editData.placementId,

                redirectUrl:
                    editData.redirectUrl,
            })
        );

        setEditModal(false);

        Swal.fire({
            icon: "success",

            title: "Updated",

            text:
                "SmartLink updated successfully",

            timer: 2000,

            showConfirmButton: false,

            background:
                "#0f172a",

            color: "#fff",
        });
    };

    // ==========================================
    // HANDLE DELETE
    // ==========================================

    const handleDelete = async (
        id
    ) => {
        const result =
            await Swal.fire({
                title:
                    "Delete SmartLink?",
                text: "This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor:
                    "#ef4444",
                cancelButtonColor:
                    "#64748b",
                confirmButtonText:
                    "Delete",
                background:
                    "#0f172a",
                color: "#fff",
            });

        if (!result.isConfirmed)
            return;

        dispatch(deleteSmartLink(id));

        Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "SmartLink deleted successfully",
            timer: 2000,
            showConfirmButton: false,
            background: "#0f172a",
            color: "#fff",
        });
    };

    return (
        <div className="space-y-6">

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Approved Smartlinks
                    </h1>

                    <p className="text-slate-400 mt-1">
                        View active and approved tracking links.
                    </p>
                </div>

                {/* SEARCH */}

                <div className="relative w-full md:w-72">

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-slate-500" />
                    </div>

                    <input
                        type="text"
                        placeholder="Search approved links..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />
                </div>
            </div>

            {/* TABLE */}

            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">

                                <th className="px-6 py-4 font-semibold">
                                    User Info
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Smartlink Details
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Tracking URL
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Status
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Created
                                </th>

                                <th className="px-6 py-4 font-semibold text-center text-[#33D399]">
                                    Approved
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-700">

                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-16 text-center text-slate-400"
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : !error &&
                              filteredLinks.length >
                                  0 ? (
                                filteredLinks.map(
                                    (item) => (
                                        <tr
                                            key={
                                                item._id
                                            }
                                            className="hover:bg-slate-700/40 transition"
                                        >

                                            {/* USER */}

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-emerald-400 font-bold">
                                                        {item.userId?.name?.charAt(
                                                            0
                                                        )?.toUpperCase() || (
                                                            <FaUser />
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <span className="text-white font-medium text-sm">
                                                            {item
                                                                .userId
                                                                ?.name ||
                                                                "Unknown"}
                                                        </span>

                                                        <span className="text-xs text-slate-500">
                                                            {
                                                                item
                                                                    .userId
                                                                    ?.email
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* DETAILS */}

                                            <td className="px-6 py-4">

                                                <div className="flex flex-col gap-1">

                                                    <span className="text-white font-semibold text-sm">
                                                        {
                                                            item.name
                                                        }
                                                    </span>

                                                    <span className="font-mono bg-slate-900 px-2 py-1 rounded text-emerald-300 text-xs w-fit">
                                                        #
                                                        {
                                                            item.linkId
                                                        }
                                                    </span>
                                                </div>
                                            </td>

                                            {/* URL */}

                                            <td className="px-6 py-4">

                                                <div className="flex flex-col gap-2 max-w-[240px]">

                                                    <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded border border-slate-700">

                                                        <FaLink className="text-slate-500" />

                                                        <span className="truncate text-emerald-400 text-xs font-mono">
                                                            {item.finalUrl ||
                                                                "No URL"}
                                                        </span>

                                                        {item.finalUrl && (
                                                            <button
                                                                onClick={() =>
                                                                    handleCopy(
                                                                        item.finalUrl
                                                                    )
                                                                }
                                                                className="ml-auto text-slate-500 hover:text-white"
                                                            >
                                                                <FaCopy size={12} />
                                                            </button>
                                                        )}
                                                    </div>

                                                    {item.redirectUrl && (
                                                        <a
                                                            href={
                                                                item.redirectUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="truncate text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-1"
                                                        >
                                                            {
                                                                item.redirectUrl
                                                            }

                                                            <FaExternalLinkAlt size={10} />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>

                                            {/* STATUS */}

                                            <td className="px-6 py-4 text-center">

                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    {
                                                        item.status
                                                    }
                                                </span>
                                            </td>

                                            {/* CREATED */}

                                            <td className="px-6 py-4 text-center">

                                                <div className="flex flex-col items-center">

                                                    <span className="text-slate-300 text-sm">
                                                        {new Date(
                                                            item.createdAt
                                                        ).toLocaleDateString()}
                                                    </span>

                                                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                        <FaRegCalendarAlt size={10} />

                                                        {new Date(
                                                            item.createdAt
                                                        ).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* APPROVED */}

                                            <td className="px-6 py-4 text-center">

                                                <div className="flex flex-col items-center">

                                                    <span className="text-emerald-400 text-sm">
                                                        {item.approvedAt
                                                            ? new Date(
                                                                  item.approvedAt
                                                              ).toLocaleDateString()
                                                            : "N/A"}
                                                    </span>

                                                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                        <FaRegCalendarAlt size={10} />

                                                        {item.approvedAt
                                                            ? new Date(
                                                                  item.approvedAt
                                                              ).toLocaleTimeString()
                                                            : "--"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* ACTIONS */}

                                            <td className="px-6 py-4">

                                                <div className="flex items-center justify-center gap-3">

                                                    {/* EDIT */}

                                                    <button
                                                        onClick={() =>
                                                            handleEditOpen(
                                                                item
                                                            )
                                                        }
                                                        className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition flex items-center justify-center"
                                                    >
                                                        <FaEdit size={14} />
                                                    </button>

                                                    {/* DELETE */}

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                        className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition flex items-center justify-center"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-16 text-center text-slate-400"
                                    >
                                        No approved links found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">

                    <span>
                        Showing{" "}
                        {
                            filteredLinks.length
                        }{" "}
                        of {links.length} approved links
                    </span>
                </div>
            </div>

            {/* ========================================== */}
            {/* EDIT MODAL */}
            {/* ========================================== */}

            {editModal && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6">

                        <h2 className="text-2xl font-bold text-white mb-6">
                            Edit SmartLink
                        </h2>

                        <div className="space-y-5">

                            {/* LINK ID */}

                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    placementId
                                </label>

                                <input
                                    type="text"
                                    value={
                                        editData.placementId
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setEditData(
                                            {
                                                ...editData,

                                                placementId:
                                                    e
                                                        .target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            {/* REDIRECT URL */}

                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    Redirect URL
                                </label>

                                <input
                                    type="text"
                                    value={
                                        editData.redirectUrl
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setEditData(
                                            {
                                                ...editData,

                                                redirectUrl:
                                                    e
                                                        .target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            {/* BUTTONS */}

                            <div className="flex items-center gap-3 pt-4">

                                <button
                                    onClick={
                                        handleEditSave
                                    }
                                    className="flex-1 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() =>
                                        setEditModal(
                                            false
                                        )
                                    }
                                    className="flex-1 h-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovedLinks;