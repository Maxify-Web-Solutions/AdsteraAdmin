import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSmartLinks } from '../redux/slice/smartlinkSlice';

const Smartlinks = () => {
    const dispatch = useDispatch();

    // ✅ FIXED STATE ACCESS
    const { links, loading, error } = useSelector((state) => state.smartLink);

    useEffect(() => {
        dispatch(getUserSmartLinks());
    }, [dispatch]);

    // ✅ SAFE FALLBACK
    const smartlinks = links || [];

    // Stats calculation
    const stats = {
        total: smartlinks.length,
        approved: smartlinks.filter(l => l.status === 'approved').length,
        pending: smartlinks.filter(l => l.status === 'pending').length,
        rejected: smartlinks.filter(l => l.status === 'rejected').length,
    };

    if (loading) {
        return <div className="text-white p-6">Loading smartlinks...</div>;
    }

    return (
        <div className="space-y-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Smartlinks Manager</h1>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <p className="text-slate-400 text-sm">Total Links</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <p className="text-green-400 text-sm">Approved</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.approved}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <p className="text-yellow-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.pending}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <p className="text-red-400 text-sm">Rejected</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.rejected}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white">All Smartlinks</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-700/50 text-slate-200 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">URL</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {!error && smartlinks.length > 0 ? (
                                smartlinks.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-700/30 transition">
                                        <td className="px-6 py-4">#{item.linkId}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-white text-sm">{item.userId?.name || 'N/A'}</span>
                                                <span className="text-xs text-slate-500">{item.userId?.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">{item.name}</td>

                                        {/* ✅ FIXED FIELD */}
                                        <td className="px-6 py-4">
                                            <span className="truncate max-w-[150px] block text-indigo-400">
                                                {item.finalUrl}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                        ${item.status === 'approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : ''}
                        ${item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : ''}
                        ${item.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : ''}
                      `}>
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* ✅ DATE FIX */}
                                        <td className="px-6 py-4">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center">
                                        {error ? <span className="text-red-400">{error}</span> : "No smartlinks found"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Smartlinks;