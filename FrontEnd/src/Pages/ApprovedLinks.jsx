import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getApprovedLinks } from '../redux/slice/smartlinkSlice';

const ApprovedLinks = () => {
    const dispatch = useDispatch();
    const { approved, loading, error } = useSelector((state) => state.smartLink);

    useEffect(() => {
        dispatch(getApprovedLinks());
    }, [dispatch]);

    const links = approved || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Approved Smartlinks</h1>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white">Approved Links List</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-700/50 text-slate-200 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">URL</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-white">Loading...</td>
                                </tr>
                            ) : !error && links.length > 0 ? (
                                links.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-700/30 transition">
                                        <td className="px-6 py-4">#{item.linkId}</td>
                                        <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="truncate max-w-[150px] block text-indigo-400">
                                                {item.finalUrl}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-xs font-medium capitalize bg-green-500/10 text-green-500 border border-green-500/20">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center">
                                        {error ? <span className="text-red-400">{typeof error === 'object' ? error.message || JSON.stringify(error) : error}</span> : "No approved links found"}
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

export default ApprovedLinks
