import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSmartLinks } from '../redux/slice/smartlinkSlice';
import { FaSearch, FaCopy, FaExternalLinkAlt, FaRegCalendarAlt, FaUser, FaLink } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Smartlinks = () => {
    const dispatch = useDispatch();
    const { links, loading, error } = useSelector((state) => state.smartLink);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getUserSmartLinks());
    }, [dispatch]);

    const smartlinks = links || [];

    // Filter logic
    const filteredLinks = smartlinks.filter(link => 
        link.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.linkId?.toString().includes(searchTerm)
    );

    // Copy to clipboard handler
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

    const stats = {
        total: smartlinks.length,
        approved: smartlinks.filter(l => l.status === 'approved').length,
        pending: smartlinks.filter(l => l.status === 'pending').length,
        rejected: smartlinks.filter(l => l.status === 'rejected').length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Smartlinks Manager</h1>
                    <p className="text-slate-400 mt-1">Monitor and manage all tracking links.</p>
                </div>
                
                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search links, users, IDs..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Links" value={stats.total} color="bg-indigo-500" />
                <StatCard label="Approved" value={stats.approved} color="bg-emerald-500" />
                <StatCard label="Pending" value={stats.pending} color="bg-amber-500" />
                <StatCard label="Rejected" value={stats.rejected} color="bg-rose-500" />
            </div>

            {/* Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
                                <th className="px-6 py-4 font-semibold">User Info</th>
                                <th className="px-6 py-4 font-semibold">Smartlink Details</th>
                                <th className="px-6 py-4 font-semibold">Tracking URL</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {!error && filteredLinks.length > 0 ? (
                                filteredLinks.map((item) => (
                                    <tr key={item._id} className="group hover:bg-slate-700/40 transition duration-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-indigo-400 font-bold text-lg border border-slate-600">
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
                                                    <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300">#{item.linkId}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                             <div className="flex flex-col gap-1 max-w-[220px]">
                                                <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded border border-slate-700 group-hover:border-slate-600 transition">
                                                    <FaLink className="text-slate-500 min-w-[12px]" size={12} />
                                                    <span className="truncate text-indigo-400 text-xs font-mono select-all">
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
                                                {item.redirectUrl && (
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-1">
                                                        <span className="text-[10px] uppercase font-bold tracking-wider">Target:</span>
                                                        <a href={item.redirectUrl} target="_blank" rel="noopener noreferrer" className="truncate hover:text-indigo-400 transition flex items-center gap-1">
                                                            {item.redirectUrl}
                                                            <FaExternalLinkAlt size={10} />
                                                        </a>
                                                    </div>
                                                )}
                                             </div>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={item.status} />
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-slate-300 text-sm font-medium">
                                                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <FaRegCalendarAlt size={10} />
                                                    {new Date(item.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-2">
                                                <FaSearch size={24} />
                                            </div>
                                            <p className="text-lg font-medium text-slate-300">No smartlinks found</p>
                                            <p className="text-sm">{searchTerm ? `No results match "${searchTerm}"` : "Try adjusting your filters or create a new link."}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                    <span>Showing {filteredLinks.length} of {smartlinks.length} entries</span>
                </div>
            </div>
        </div>
    )
}

const StatCard = ({ label, value, color }) => (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-slate-600 transition-all duration-300 shadow-lg">
        <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110`}></div>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wide z-10 relative">{label}</p>
        <p className="text-3xl font-bold text-white mt-2 z-10 relative">{value}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
        pending: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
        rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]"
    };
    
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${styles[status] || "bg-slate-700 text-slate-400 border-slate-600"}`}>
            {status}
        </span>
    );
};

export default Smartlinks;