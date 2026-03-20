import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPendingLinks, approveSmartLink, rejectSmartLink } from '../redux/slice/smartlinkSlice';
import { FaCheck, FaSearch, FaCopy, FaExternalLinkAlt, FaRegCalendarAlt, FaUser, FaLink } from 'react-icons/fa';
import { MdBlock } from "react-icons/md";
import Swal from 'sweetalert2';

const PendingLinks = () => {
    const dispatch = useDispatch();
    const { pending, loading, error } = useSelector((state) => state.smartLink);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getPendingLinks());
    }, [dispatch]);

    const links = pending || [];
    
    const filteredLinks = links.filter(link => 
        link.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.linkId?.toString().includes(searchTerm)
    );

    const handleCopy = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#1e293b',
            color: '#fff',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: 'success',
            title: 'Copied to clipboard'
        });
    };

    const handleApprove = async (link) => {
        const { value: url } = await Swal.fire({
            title: 'Approve Smartlink',
            input: 'url',
            inputLabel: 'Redirect URL',
            inputValue: "",
            showCancelButton: true,
            confirmButtonText: 'Approve',
            background: "#1e293b",
            color: "#fff",
            confirmButtonColor: "#22c55e",
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter URL!'
                }
            }
        });

    if (url) {
        try {
            const res = await dispatch(
                approveSmartLink({ id: link._id, redirectUrl: url })
            );

            if (res.meta.requestStatus === "fulfilled") {
                await Swal.fire({
                    icon: "success",
                    title: "Approved!",
                    text: "Smartlink approved successfully",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "#1e293b",
                    color: "#fff"
                });
            } else {
                throw new Error(res.payload);
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Approval failed",
                background: "#1e293b",
                color: "#fff",
                confirmButtonColor: "#ef4444"
            });
        }
    }
};

    const handleReject = (id) => {
    Swal.fire({
        title: 'Reject Smartlink?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6366f1',
        confirmButtonText: 'Yes, reject it!',
        background: "#1e293b",
        color: "#fff"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await dispatch(rejectSmartLink(id));

                if (res.meta.requestStatus === "fulfilled") {
                    await Swal.fire({
                        icon: "success",
                        title: "Rejected!",
                        text: "Smartlink rejected successfully",
                        timer: 1500,
                        showConfirmButton: false,
                        background: "#1e293b",
                        color: "#fff"
                    });
                } else {
                    throw new Error(res.payload);
                }
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || "Rejection failed",
                    background: "#1e293b",
                    color: "#fff",
                    confirmButtonColor: "#ef4444"
                });
            }
        }
    });
};

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Pending Smartlinks</h1>
                <p className="text-slate-400 mt-1">Review and action pending requests.</p>
            </div>

            <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-slate-500" />
                </div>
                <input
                    type="text"
                    placeholder="Search pending links..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
                            <th className="px-6 py-4 font-semibold">User Info</th>
                            <th className="px-6 py-4 font-semibold">Smartlink Details</th>
                            <th className="px-6 py-4 font-semibold">Tracking URL</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                            <th className="px-6 py-4 font-semibold text-center">Created</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-16 text-center text-slate-400">
                                     <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : !error && filteredLinks.length > 0 ? (
                            filteredLinks.map((item) => (
                                <tr key={item._id} className="group hover:bg-slate-700/40 transition duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-amber-400 font-bold text-lg border border-slate-600">
                                                {item.userId?.name?.charAt(0).toUpperCase() || <FaUser size={14} />}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium text-sm">{item.userId?.name || 'Unknown'}</span>
                                                <span className="text-xs text-slate-500">{item.userId?.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-semibold text-sm">{item.name}</span>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-amber-300">#{item.linkId}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                         <div className="flex flex-col gap-1 max-w-[220px]">
                                            <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded border border-slate-700 group-hover:border-slate-600 transition">
                                                <FaLink className="text-slate-500 min-w-[12px]" size={12} />
                                                <span className="truncate text-amber-400 text-xs font-mono select-all">
                                                    {item.finalUrl || 'No URL generated'}
                                                </span>
                                                {item.finalUrl && (
                                                    <button 
                                                        onClick={() => handleCopy(item.finalUrl)}
                                                        className="ml-auto text-slate-500 hover:text-white transition"
                                                        title="Copy Link"
                                                    >
                                                        <FaCopy size={12} />
                                                    </button>
                                                )}
                                            </div>
                                         </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize border bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-slate-300 text-sm font-medium">
                                                {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <FaRegCalendarAlt size={10} />
                                                {new Date(item.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleApprove(item)}
                                                className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition border border-emerald-500/20"
                                                title="Approve"
                                            >
                                                <FaCheck size={16}/>
                                            </button>
                                            <button 
                                                onClick={() => handleReject(item._id)}
                                                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition border border-rose-500/20"
                                                title="Reject"
                                            >
                                                <MdBlock size={16}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-16 text-center text-slate-400">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-2">
                                            <FaSearch size={24} />
                                        </div>
                                        <p className="text-lg font-medium text-slate-300">No pending links found</p>
                                        <p className="text-sm">{searchTerm ? `No results match "${searchTerm}"` : "Pending requests will appear here."}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                <span>Showing {filteredLinks.length} of {links.length} pending links</span>
            </div>
        </div>
    </div>
  )
}

export default PendingLinks