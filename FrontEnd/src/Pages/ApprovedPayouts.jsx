import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getAllWithdrawals,
} from "../redux/slice/withdrawalSlice";

import PayoutDetailsModal from "../components/PayoutDetailsModal";

import {
    FaUser,
    FaMoneyBillWave,
    FaRegCalendarAlt,
    FaCheckCircle,
    FaEye,
} from "react-icons/fa";

const ApprovedPayouts = () => {

    const dispatch = useDispatch();

    const [selectedPayout, setSelectedPayout] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        allWithdrawals = [],
        loading,
    } = useSelector((state) => state.withdrawal);


    // ================= FETCH =================
    useEffect(() => {
        dispatch(getAllWithdrawals());
    }, [dispatch]);


    // ================= FILTER APPROVED =================
    const approvedWithdrawals = allWithdrawals.filter(
        (item) => item.status === "approved"
    );


    // ================= OPEN MODAL =================
    const handleOpenModal = (item) => {
        setSelectedPayout(item);
        setIsModalOpen(true);
    };


    return (
        <div className="space-y-6">

            {/* ================= HEADER ================= */}
            <div>

                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Approved Payouts
                </h1>

                <p className="text-slate-400 mt-1">
                    View all approved payout requests.
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
                                    Created At
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Approved At
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    Remark
                                </th>

                                <th className="px-6 py-4 font-semibold text-center">
                                    View
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

                            ) : approvedWithdrawals.length > 0 ? (

                                approvedWithdrawals.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="group hover:bg-slate-700/40 transition duration-200"
                                    >

                                        {/* ================= USER ================= */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center text-emerald-400 font-bold border border-slate-600">
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

                                        {/* ================= APPROVED DATE ================= */}
                                        <td className="px-6 py-5 text-center">

                                            <div className="flex flex-col items-center">

                                                <span className="text-emerald-400 text-sm font-medium whitespace-nowrap">
                                                    {new Date(item.updatedAt).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>

                                                <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 whitespace-nowrap">

                                                    <FaCheckCircle size={10} />

                                                    {new Date(item.updatedAt).toLocaleTimeString(
                                                        undefined,
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}

                                                </span>

                                            </div>

                                        </td>



                                        {/* ================= REMARK ================= */}
                                        <td className="px-6 py-5 text-center">

                                            <div className="text-emerald-400 text-sm font-medium">
                                                {item.adminRemark || "Approved"}
                                            </div>

                                        </td>



                                        {/* ================= VIEW ================= */}
                                        <td className="px-6 py-5 text-center">

                                            <button
                                                onClick={() => handleOpenModal(item)}
                                                className="px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition shadow-lg"
                                            >
                                                <FaEye />
                                            </button>

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
                                                <FaCheckCircle size={24} />
                                            </div>

                                            <p className="text-lg font-medium text-slate-300">
                                                No approved payouts
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
                        Showing {approvedWithdrawals.length} approved payouts
                    </span>

                </div>

            </div>
            {/* ================= MODAL ================= */}
            <PayoutDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                payout={selectedPayout}
            />

        </div>
    );
};

export default ApprovedPayouts;