import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPendingLinks, approveSmartLink, rejectSmartLink } from '../redux/slice/smartlinkSlice';
import Swal from 'sweetalert2';

const PendingLinks = () => {
    const dispatch = useDispatch();
    const { pending, loading, error } = useSelector((state) => state.smartLink);

    useEffect(() => {
        dispatch(getPendingLinks());
    }, [dispatch]);

    const links = pending || [];

    const handleApprove = async (link) => {
        const { value: url } = await Swal.fire({
            title: 'Approve Smartlink',
            input: 'url',
            inputLabel: 'Redirect URL',
            inputValue: link.finalUrl,
            showCancelButton: true,
            confirmButtonText: 'Approve',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        });

        if (url) {
            dispatch(approveSmartLink({ id: link._id, redirectUrl: url }));
        }
    };

    const handleReject = (id) => {
        Swal.fire({
            title: 'Reject Smartlink?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(rejectSmartLink(id));
            }
        });
    };

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Pending Smartlinks</h1>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700">
                <h2 className="text-lg font-semibold text-white">Pending Links List</h2>
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
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-white">Loading...</td>
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
                                        <span className="px-2 py-1 rounded text-xs font-medium capitalize bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleApprove(item)}
                                            className="text-green-400 hover:text-green-300 mr-3">Approve</button>
                                        <button 
                                            onClick={() => handleReject(item._id)}
                                            className="text-red-400 hover:text-red-300">Reject</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center">
                                    {error ? <span className="text-red-400">{typeof error === 'object' ? error.message || JSON.stringify(error) : error}</span> : "No pending links found"}
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

export default PendingLinks