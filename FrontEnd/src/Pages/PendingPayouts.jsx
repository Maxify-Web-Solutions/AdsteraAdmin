import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getAllWithdrawals,
    updateWithdrawalStatus,
} from "../redux/slice/withdrawalSlice";

import {
    FaUser,
    FaMoneyBillWave,
    FaCheck,
    FaTimes,
    FaRegCalendarAlt,
    FaUniversity,
    FaWallet,
    FaEye,
} from "react-icons/fa";

import Swal from "sweetalert2";
import PayoutDetailsModal from "../Components/PayoutDetailsModal";

const PendingPayouts = () => {

    const [selectedPayout, setSelectedPayout] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (item) => {
        setSelectedPayout(item);
        setIsModalOpen(true);
    };

    const dispatch = useDispatch();

    const {
        allWithdrawals = [],
        loading,
    } = useSelector((state) => state.withdrawal);


    // ================= FETCH =================
    useEffect(() => {
        dispatch(getAllWithdrawals());
    }, [dispatch]);


    // ================= FILTER PENDING =================
    const pendingWithdrawals = allWithdrawals.filter(
        (item) => item.status === "pending"
    );


    // ================= UPDATE STATUS =================
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
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Pending Payouts
                </h1>

                <p className="text-slate-400 mt-1">
                    Review and manage pending payout requests.
                </p>
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
                                        colSpan="5"
                                        className="px-6 py-16 text-center text-slate-400"
                                    >

                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                                        </div>

                                    </td>
                                </tr>

                            ) : pendingWithdrawals.length > 0 ? (

                                pendingWithdrawals.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="group hover:bg-slate-700/40 transition duration-200"
                                    >

                                        {/* ================= USER ================= */}
                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-emerald-400 font-bold border border-slate-600">
                                                    {item.userId?.name?.charAt(0).toUpperCase() || (
                                                        <FaUser size={14} />
                                                    )}
                                                </div>

                                                <div className="flex flex-col">

                                                    <span className="text-white font-medium text-sm">
                                                        {item.userId?.name || "Unknown"}
                                                    </span>

                                                    <span className="text-xs text-slate-500">
                                                        {item.userId?.email}
                                                    </span>

                                                    <span className="text-xs text-slate-500">
                                                        {item.userId?.mobile}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>



                                        {/* ================= AMOUNT ================= */}
                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">

                                                <FaMoneyBillWave />

                                                ${item.amount}

                                            </div>

                                        </td>
                                        {/* ================= CREATED DATE ================= */}
                                        <td className="px-6 py-4 text-center">

                                            <div className="flex flex-col items-center">

                                                <span className="text-slate-300 text-sm font-medium whitespace-nowrap">
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
                                        <td className="px-6 py-4">

                                            <div className="flex items-center justify-center gap-2">

                                                {/* VIEW */}
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

                                        </td>

                                    </tr>
                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-6 py-16 text-center text-slate-400"
                                    >

                                        <div className="flex flex-col items-center justify-center gap-3">

                                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
                                                <FaMoneyBillWave size={24} />
                                            </div>

                                            <p className="text-lg font-medium text-slate-300">
                                                No pending payouts
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
                        Showing {pendingWithdrawals.length} pending payouts
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

export default PendingPayouts;