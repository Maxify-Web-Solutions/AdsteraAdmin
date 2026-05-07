import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PayoutDetailsModal from "../Components/PayoutDetailsModal";
import {
    getAllWithdrawals,
    updateWithdrawalStatus,
} from "../redux/slice/withdrawalSlice";

import {
    FaSearch,
    FaUser,
    FaMoneyBillWave,
    FaCheck,
    FaTimes,
    FaRegCalendarAlt,
    FaEye,
} from "react-icons/fa";

import Swal from "sweetalert2";

const ManagePayouts = () => {
    const dispatch = useDispatch();

    const [selectedPayout, setSelectedPayout] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (item) => {
        setSelectedPayout(item);
        setIsModalOpen(true);
    };

    const {
        allWithdrawals,
        loading,
    } = useSelector((state) => state.withdrawal);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllWithdrawals());
    }, [dispatch]);

    const withdrawals = allWithdrawals || [];

    const filteredWithdrawals = withdrawals.filter((item) =>
        item.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ==============================
    // ✅ UPDATE STATUS
    // ==============================
    const handleUpdateStatus = async (withdrawalId, status) => {

        const { value: remark } = await Swal.fire({
            title: `${status === "approved" ? "Approve" : "Reject"} Withdrawal`,
            input: "text",
            inputLabel: "Remark (Optional)",
            inputPlaceholder: "Enter admin remark...",
            showCancelButton: true,
            confirmButtonColor:
                status === "approved" ? "#10b981" : "#ef4444",
        });

        if (remark !== undefined) {

            dispatch(
                updateWithdrawalStatus({
                    withdrawalId,
                    status,
                    remark,
                })
            );

            Swal.fire({
                icon: "success",
                title: `Withdrawal ${status}`,
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="space-y-6">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Manage Payouts
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Manage all withdrawal and payout requests.
                    </p>
                </div>

                {/* SEARCH */}
                <div className="relative w-full md:w-72">

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-slate-500" />
                    </div>

                    <input
                        type="text"
                        placeholder="Search payouts..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>
            </div>



            {/* ================= TABLE ================= */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse">

                        {/* ================= TABLE HEAD ================= */}
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">

                                <th className="px-6 py-4 font-semibold">
                                    User
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Amount
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Status
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Created
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Actions
                                </th>

                            </tr>
                        </thead>



                        {/* ================= TABLE BODY ================= */}
                        <tbody className="divide-y divide-slate-700">

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-16 text-center text-slate-400"
                                    >

                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                                        </div>

                                    </td>
                                </tr>

                            ) : filteredWithdrawals.length > 0 ? (

                                filteredWithdrawals.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="group hover:bg-slate-700/30 transition duration-200"
                                    >

                                        {/* ================= USER ================= */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center text-emerald-400 font-bold border border-slate-600 shadow-lg">
                                                    {item.userId?.name?.charAt(0).toUpperCase() || (
                                                        <FaUser size={14} />
                                                    )}
                                                </div>

                                                <div className="flex flex-col">

                                                    <span className="text-white font-semibold text-sm">
                                                        {item.userId?.name || "Unknown"}
                                                    </span>

                                                    <span className="text-xs text-slate-400">
                                                        {item.userId?.email}
                                                    </span>

                                                    <span className="text-xs text-slate-500">
                                                        {item.userId?.mobile}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>



                                        {/* ================= AMOUNT ================= */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">

                                                <FaMoneyBillWave />

                                                ${item.amount}

                                            </div>

                                        </td>
                                        {/* ================= STATUS ================= */}
                                        <td className="px-6 py-5 text-center">

                                            <span
                                                className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize border shadow-lg

                                    ${item.status === "approved"
                                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                        : item.status === "rejected"
                                                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>



                                        {/* ================= CREATED DATE ================= */}
                                        <td className="px-6 py-5 text-center">

                                            <div className="flex flex-col items-center">

                                                <span className="text-slate-200 text-sm font-medium whitespace-nowrap">
                                                    {new Date(item.createdAt).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>

                                                <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 whitespace-nowrap">

                                                    <FaRegCalendarAlt size={10} />

                                                    {new Date(item.createdAt).toLocaleTimeString(
                                                        undefined,
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}

                                                </span>

                                            </div>

                                        </td>



                                        {/* ================= ACTIONS ================= */}
                                        <td className="px-6 py-5">

                                            {item.status === "pending" ? (

                                                <div className="flex items-center justify-center gap-2">

                                                    {/* VIEW DETAILS */}
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition shadow-lg"
                                                    >
                                                        <FaEye />
                                                    </button>

                                                    {/* APPROVE */}
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(item._id, "approved")
                                                        }
                                                        className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition shadow-lg"
                                                    >
                                                        <FaCheck />
                                                    </button>


                                                    {/* REJECT */}
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(item._id, "rejected")
                                                        }
                                                        className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition shadow-lg"
                                                    >
                                                        <FaTimes />
                                                    </button>

                                                </div>

                                            ) : (

                                                <div className="text-center text-xs text-slate-500 capitalize">
                                                    Already {item.status}
                                                </div>

                                            )}

                                        </td>

                                    </tr>
                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-6 py-16 text-center text-slate-400"
                                    >

                                        <div className="flex flex-col items-center justify-center gap-3">

                                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
                                                <FaSearch size={24} />
                                            </div>

                                            <p className="text-lg font-medium text-slate-300">
                                                No payouts found
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>
                    </table>
                </div>



                {/* ================= FOOTER ================= */}
                <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">

                    <span>
                        Showing {filteredWithdrawals.length} of{" "}
                        {withdrawals.length} payouts
                    </span>

                </div>

            </div>

            <PayoutDetailsModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    payout={selectedPayout}
/>

        </div>
    );
};

export default ManagePayouts;