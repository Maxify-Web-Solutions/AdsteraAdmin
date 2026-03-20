import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRejectedLinks } from '../redux/slice/smartlinkSlice';
import { FaSearch, FaCopy, FaExternalLinkAlt, FaRegCalendarAlt, FaUser, FaLink } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RejectedLinks = () => {
    const dispatch = useDispatch();
    const { rejected, loading, error } = useSelector((state) => state.smartLink);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getRejectedLinks());
    }, [dispatch]);

    const links = rejected || [];

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

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Rejected Smartlinks</h1>
                    <p className="text-slate-400 mt-1">Review links that have been declined.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search rejected links..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent placeholder-slate-500 transition-all"
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
                                <th className="px-6 py-4 font-semibold text-right">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center text-slate-400">
                                         <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : !error && filteredLinks.length > 0 ? (
                                filteredLinks.map((item) => (
                                    <tr key={item._id} className="group hover:bg-slate-700/40 transition duration-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-rose-400 font-bold text-lg border border-slate-600">
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
                                                    <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-rose-300">#{item.linkId}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                             <div className="flex flex-col gap-1 max-w-[220px]">
                                                <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded border border-slate-700 group-hover:border-slate-600 transition">
                                                    <FaLink className="text-slate-500 min-w-[12px]" size={12} />
                                                    <span className="truncate text-rose-400 text-xs font-mono select-all">
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
                                                        <a href={item.redirectUrl} target="_blank" rel="noopener noreferrer" className="truncate hover:text-rose-400 transition flex items-center gap-1">
                                                            {item.redirectUrl}
                                                            <FaExternalLinkAlt size={10} />
                                                        </a>
                                                    </div>
                                                )}
                                             </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize border bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                                                {item.status}
                                            </span>
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
                                            <p className="text-lg font-medium text-slate-300">No rejected links found</p>
                                            <p className="text-sm">{searchTerm ? `No results match "${searchTerm}"` : "Rejected links will appear here."}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                    <span>Showing {filteredLinks.length} of {links.length} rejected links</span>
                </div>
            </div>
        </div>
    )
}

export default RejectedLinks