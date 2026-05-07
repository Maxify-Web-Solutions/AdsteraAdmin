// components/PayoutDetailsModal.jsx

import React from "react";
import {
    FaTimes,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMoneyBillWave,
    FaUniversity,
    FaWallet,
    FaCalendarAlt,
} from "react-icons/fa";

const PayoutDetailsModal = ({
    isOpen,
    onClose,
    payout,
}) => {

    if (!isOpen || !payout) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

            {/* MODAL */}
            <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Payout Details
                        </h2>

                        <p className="text-sm text-slate-400 mt-1">
                            Complete payout and account information
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-slate-400 hover:text-white"
                    >
                        <FaTimes />
                    </button>

                </div>



                {/* BODY */}
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

                    {/* ================= USER INFO ================= */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

                        <div className="flex items-center gap-2 mb-5">

                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <FaUser />
                            </div>

                            <div>
                                <h3 className="text-white font-semibold">
                                    User Information
                                </h3>

                                <p className="text-xs text-slate-500">
                                    User profile details
                                </p>
                            </div>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* NAME */}
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">

                                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider mb-2">
                                    <FaUser />
                                    Name
                                </div>

                                <p className="text-white font-medium">
                                    {payout.userId?.name || "-"}
                                </p>

                            </div>


                            {/* EMAIL */}
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">

                                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider mb-2">
                                    <FaEnvelope />
                                    Email
                                </div>

                                <p className="text-slate-300 break-all">
                                    {payout.userId?.email || "-"}
                                </p>

                            </div>


                            {/* MOBILE */}
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">

                                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider mb-2">
                                    <FaPhone />
                                    Mobile
                                </div>

                                <p className="text-slate-300">
                                    {payout.userId?.mobile || "-"}
                                </p>

                            </div>


                            {/* AMOUNT */}
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">

                                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider mb-2">
                                    <FaMoneyBillWave />
                                    Amount
                                </div>

                                <p className="text-emerald-400 font-bold text-lg">
                                    ₹{payout.amount}
                                </p>

                            </div>

                        </div>

                    </div>



                    {/* ================= PAYMENT DETAILS ================= */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

                        <div className="flex items-center gap-2 mb-5">

                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${payout.paymentMethod === "bank"
                                        ? "bg-blue-500/10 text-blue-400"
                                        : "bg-emerald-500/10 text-emerald-400"
                                    }`}
                            >
                                {payout.paymentMethod === "bank"
                                    ? <FaUniversity />
                                    : <FaWallet />
                                }
                            </div>

                            <div>
                                <h3 className="text-white font-semibold">
                                    {payout.paymentMethod === "bank"
                                        ? "Bank Details"
                                        : "Crypto Wallet Details"}
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Payment account information
                                </p>
                            </div>

                        </div>


                        {/* BANK DETAILS */}
                        {payout.paymentMethod === "bank" ? (

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                        Account Holder
                                    </p>

                                    <p className="text-white font-medium">
                                        {payout.accountHolderName || "-"}
                                    </p>
                                </div>


                                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                        Bank Name
                                    </p>

                                    <p className="text-slate-300">
                                        {payout.bankName || "-"}
                                    </p>
                                </div>


                                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                        Account Number
                                    </p>

                                    <p className="text-emerald-400 font-mono break-all">
                                        {payout.accountNumber || "-"}
                                    </p>
                                </div>


                                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                        IFSC Code
                                    </p>

                                    <p className="text-slate-300 font-mono">
                                        {payout.ifscCode || "-"}
                                    </p>
                                </div>

                            </div>

                        ) : (

                            /* CRYPTO DETAILS */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                        Crypto Type
                                    </p>

                                    <p className="text-white font-medium">
                                        {payout.cryptoType || "-"}
                                    </p>
                                </div>


                                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                        Network
                                    </p>

                                    <p className="text-emerald-400">
                                        {payout.network || "-"}
                                    </p>
                                </div>


                                <div className="md:col-span-2 bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                        Wallet Address
                                    </p>

                                    <p className="text-slate-300 font-mono text-sm break-all leading-relaxed">
                                        {payout.walletAddress || "-"}
                                    </p>
                                </div>

                            </div>

                        )}

                    </div>



                    {/* ================= FOOTER INFO ================= */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            {/* STATUS */}
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">

                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                    Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize border

                  ${payout.status === "approved"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : payout.status === "rejected"
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        }`}
                                >
                                    {payout.status}
                                </span>

                            </div>


                            {/* DATE */}
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">

                                <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-2">
                                    <FaCalendarAlt />
                                    Created Date
                                </div>

                                <p className="text-white">
                                    {new Date(payout.createdAt).toLocaleDateString()}
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                    {new Date(payout.createdAt).toLocaleTimeString()}
                                </p>

                            </div>


                            {/* REMARK */}
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">

                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                    Admin Remark
                                </p>

                                <p className="text-slate-300 text-sm">
                                    {payout.adminRemark || "No remark"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default PayoutDetailsModal;