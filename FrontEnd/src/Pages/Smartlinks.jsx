import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getAllSmartLinks,
    deleteSmartLink,
} from "../redux/slice/smartlinkSlice";

import {
    FaSearch,
    FaCopy,
    FaExternalLinkAlt,
    FaRegCalendarAlt,
    FaUser,
    FaLink,
    FaTrash,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
} from "react-icons/fa";

import Swal from "sweetalert2";

const Smartlinks = () => {

    const dispatch = useDispatch();

    const {
        links = [],
        loading,
        error,
        total,
        page,
        pages,
    } = useSelector((state) => state.smartLink);


    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);


    // ================= FETCH =================
    useEffect(() => {

        dispatch(
            getAllSmartLinks({
                page: currentPage,
                limit: 10,
                search: searchTerm,
            })
        );

    }, [dispatch, currentPage, searchTerm]);



    // ================= COPY =================
    const handleCopy = (text) => {

        navigator.clipboard.writeText(text);

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Copied to clipboard",
            showConfirmButton: false,
            timer: 2000,
            background: "#0f172a",
            color: "#fff",
        });
    };



    // ================= DELETE =================
    const handleDelete = async (id) => {

        const confirm = await Swal.fire({
            title: "Delete SmartLink?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            background: "#0f172a",
            color: "#fff",
        });

        if (!confirm.isConfirmed) return;

        dispatch(deleteSmartLink(id));
    };



    // ================= STATS =================
    const stats = {
        total: links.length,
        approved: links.filter(
            (l) => l.status === "approved"
        ).length,

        pending: links.filter(
            (l) => l.status === "pending"
        ).length,

        rejected: links.filter(
            (l) => l.status === "rejected"
        ).length,
    };



    if (loading) {

        return (
            <div className="flex items-center justify-center min-h-[400px]">

                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>

            </div>
        );
    }



    return (
        <div className="space-y-6 md:space-y-8">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div>

                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Smartlinks Manager
                    </h1>

                    <p className="text-slate-400 mt-1 text-sm md:text-base">
                        Monitor and manage all smart tracking links.
                    </p>

                </div>



                {/* SEARCH */}
                <div className="relative w-full lg:w-80">

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-slate-500" />
                    </div>

                    <input
                        type="text"
                        placeholder="Search smartlinks..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>



            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                <StatCard
                    label="Total Links"
                    value={stats.total}
                    color="bg-indigo-500"
                    icon={<FaLink />}
                />

                <StatCard
                    label="Approved"
                    value={stats.approved}
                    color="bg-emerald-500"
                    icon={<FaCheckCircle />}
                />

                <StatCard
                    label="Pending"
                    value={stats.pending}
                    color="bg-amber-500"
                    icon={<FaClock />}
                />

                <StatCard
                    label="Rejected"
                    value={stats.rejected}
                    color="bg-rose-500"
                    icon={<FaTimesCircle />}
                />

            </div>



            {/* ================= TABLE ================= */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1100px] text-left border-collapse">

                        {/* ================= TABLE HEAD ================= */}
                        <thead>

                            <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">

                                <th className="px-6 py-4 font-semibold">
                                    User
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    SmartLink
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Tracking URL
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Status
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Approved At
                                </th>

                                <th className="px-6 py-4 font-semibold text-right">
                                    Created
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>



                        {/* ================= TABLE BODY ================= */}
                        <tbody className="divide-y divide-slate-700">

                            {!error && links.length > 0 ? (

                                links.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="group hover:bg-slate-700/30 transition"
                                    >

                                        {/* USER */}
                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center text-indigo-400 border border-slate-600 font-bold">

                                                    {item.userId?.name?.charAt(0)?.toUpperCase() || (
                                                        <FaUser />
                                                    )}

                                                </div>

                                                <div className="flex flex-col">

                                                    <span className="text-white font-medium text-sm">
                                                        {item.userId?.name || "Unknown"}
                                                    </span>

                                                    <span className="text-xs text-slate-500">
                                                        {item.userId?.email}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>



                                        {/* SMARTLINK */}
                                        <td className="px-6 py-4">

                                            <div className="flex flex-col gap-1">

                                                <span className="text-white font-semibold">
                                                    {item.name}
                                                </span>

                                                <span className="text-xs text-indigo-400 font-mono bg-slate-900 px-2 py-1 rounded-md w-fit">
                                                    #{item.linkId}
                                                </span>

                                            </div>

                                        </td>



                                        {/* URL */}
                                        <td className="px-6 py-4">

                                            <div className="max-w-[260px] flex flex-col gap-2">

                                                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">

                                                    <FaLink
                                                        className="text-slate-500"
                                                        size={12}
                                                    />

                                                    <span className="truncate text-indigo-400 text-xs font-mono">
                                                        {item.finalUrl}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            handleCopy(item.finalUrl)
                                                        }
                                                        className="ml-auto text-slate-500 hover:text-white transition"
                                                    >
                                                        <FaCopy size={12} />
                                                    </button>

                                                </div>



                                                {item.redirectUrl && (

                                                    <a
                                                        href={item.redirectUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 truncate"
                                                    >

                                                        {item.redirectUrl}

                                                        <FaExternalLinkAlt size={10} />

                                                    </a>

                                                )}

                                            </div>

                                        </td>



                                        {/* STATUS */}
                                        <td className="px-6 py-4 text-center">

                                            <StatusBadge
                                                status={item.status}
                                            />

                                        </td>



                                        {/* APPROVED DATE */}
                                        <td className="px-6 py-4 text-center">

                                            {item.approvedAt ? (

                                                <div className="flex flex-col items-center">

                                                    <span className="text-emerald-400 text-sm font-medium whitespace-nowrap">

                                                        {new Date(
                                                            item.approvedAt
                                                        ).toLocaleDateString()}

                                                    </span>

                                                    <span className="text-xs text-slate-500 mt-1 whitespace-nowrap">

                                                        {new Date(
                                                            item.approvedAt
                                                        ).toLocaleTimeString()}

                                                    </span>

                                                </div>

                                            ) : (

                                                <span className="text-slate-500 text-sm">
                                                    --
                                                </span>

                                            )}

                                        </td>



                                        {/* CREATED */}
                                        <td className="px-6 py-4 text-right">

                                            <div className="flex flex-col items-end">

                                                <span className="text-slate-300 text-sm font-medium whitespace-nowrap">

                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()}

                                                </span>

                                                <span className="text-xs text-slate-500 mt-1 flex items-center gap-1 whitespace-nowrap">

                                                    <FaRegCalendarAlt size={10} />

                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleTimeString()}

                                                </span>

                                            </div>

                                        </td>



                                        {/* ACTIONS */}
                                        <td className="px-6 py-4 text-center">

                                            <button
                                                onClick={() =>
                                                    handleDelete(item._id)
                                                }
                                                className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition"
                                            >

                                                <FaTrash />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-6 py-20 text-center"
                                    >

                                        <div className="flex flex-col items-center gap-4">

                                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-slate-500">
                                                <FaSearch size={22} />
                                            </div>

                                            <div>

                                                <h3 className="text-lg font-semibold text-slate-300">
                                                    No SmartLinks Found
                                                </h3>

                                                <p className="text-sm text-slate-500 mt-1">
                                                    Try changing search filters.
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>



                {/* ================= FOOTER ================= */}
                <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">

                    <span className="text-xs text-slate-400">
                        Showing {links.length} of {total} smartlinks
                    </span>



                    {/* PAGINATION */}
                    <div className="flex items-center gap-2">

                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                            }
                            className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="text-sm text-slate-400">
                            Page {page} of {pages}
                        </span>

                        <button
                            disabled={currentPage === pages}
                            onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                            }
                            className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};



// ================= STAT CARD =================
const StatCard = ({
    label,
    value,
    color,
    icon,
}) => (

    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 relative overflow-hidden group hover:border-slate-600 transition shadow-lg">

        <div
            className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 rounded-full -mr-10 -mt-10`}
        ></div>

        <div className="flex items-center justify-between relative z-10">

            <div>

                <p className="text-slate-400 text-sm uppercase tracking-wide">
                    {label}
                </p>

                <p className="text-3xl font-bold text-white mt-2">
                    {value}
                </p>

            </div>

            <div
                className={`w-12 h-12 rounded-xl ${color} bg-opacity-20 flex items-center justify-center text-white`}
            >
                {icon}
            </div>

        </div>

    </div>
);



// ================= STATUS BADGE =================
const StatusBadge = ({ status }) => {

    const styles = {

        approved:
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

        pending:
            "bg-amber-500/10 text-amber-400 border-amber-500/20",

        rejected:
            "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };


    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${styles[status]}`}
        >
            {status}
        </span>
    );
};

export default Smartlinks;