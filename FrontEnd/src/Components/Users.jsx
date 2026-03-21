import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers} from "../redux/slice/adminSlice";
import { unblockUser, updateUser, blockUser } from "../redux/slice/authSlice";
import { FaSearch, FaEdit, FaBan, FaUser, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone, FaCalendarAlt, FaShieldAlt, FaIdBadge, FaTimes, FaClock, FaTrash, FaSave, FaUnlock } from "react-icons/fa";

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    // Sorting
    const sortedUsers = [...users].sort((a, b) => {
        if (a.role === "admin") return -1;
        if (b.role === "admin") return 1;
        return 0;
    });

    // Filtering
    const filteredUsers = sortedUsers.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Actions
    const handleBlock = async (id) => {
        if (window.confirm("Are you sure you want to block this user?")) {
            await dispatch(blockUser(id));
            dispatch(getUsers());
        }
    };

    const handleUnblock = async (id) => {
        if (window.confirm("Are you sure you want to unblock this user?")) {
            await dispatch(unblockUser(id));
            dispatch(getUsers());
        }
    };

    const handleEditClick = (user) => {
        setEditData(user);
        setIsEditOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser({ id: editData._id, userData: editData }));
        setIsEditOpen(false);
    };

    // Stats
    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        active: users.length // Assuming all fetched are active for now, or filter by status if available
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Users Management</h1>
                    <p className="text-slate-400 mt-1">View, search, and manage all users.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Total Accounts</p>
                        <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                    </div>
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                        <FaUser />
                    </div>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Administrators</p>
                        <p className="text-2xl font-bold text-white mt-1">{stats.admins}</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
                        <FaShieldAlt />
                    </div>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Active Users</p>
                        <p className="text-2xl font-bold text-white mt-1">{stats.active}</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                        <FaIdBadge />
                    </div>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900/50">
                            <tr className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
                                <th className="px-6 py-4 font-semibold">User Details</th>
                                <th className="px-6 py-4 font-semibold hidden sm:table-cell">Contact Info</th>
                                <th className="px-6 py-4 font-semibold hidden md:table-cell">Joined Date</th>
                                <th className="px-6 py-4 font-semibold text-center">Role</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        onClick={() => setSelectedUser(user)}
                                        className={`hover:bg-slate-700/40 transition duration-200 cursor-pointer group ${user.role === 'admin' ? 'bg-purple-900/5' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm border shadow-sm transition-transform group-hover:scale-105 ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-slate-700 text-indigo-400 border-slate-600'}`}>
                                                    {user.role === 'admin' ? <FaShieldAlt size={14} /> : (user.name ? user.name.charAt(0).toUpperCase() : <FaUser size={14} />)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white flex items-center gap-2">
                                                        {user.name || 'Unnamed User'}
                                                        {user.role === 'admin' && <span className="hidden lg:inline text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded ml-1 font-bold tracking-wide">ADMIN</span>}
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-mono mt-0.5 max-w-[120px] truncate" title={user._id}>ID: {user._id}</p>
                                                    <p className="text-xs text-slate-500 font-mono block md:hidden">{user.role || 'User'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <FaEnvelope className="text-slate-500 text-xs" />
                                                    {user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <FaPhone className="text-slate-600 text-xs" />
                                                    {user.mobile || 'No mobile'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                <FaCalendarAlt className="text-slate-600 text-xs" />
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${user.role === 'admin'
                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]'
                                                : 'bg-slate-700/50 text-slate-400 border-slate-600'
                                                }`}>
                                                {user.role === 'admin' && <FaShieldAlt size={10} />}
                                                {user.role || 'User'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <button 
                                                    onClick={() => handleEditClick(user)}
                                                    title="Edit User" 
                                                    className="p-2 text-blue-400 hover:text-white rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition border border-blue-500/20">
                                                    <FaEdit size={14} />
                                                </button>
                                                {user.status === 'blocked' ? (
                                                    <button 
                                                        onClick={() => handleUnblock(user._id)}
                                                        title="Unblock User" 
                                                        className="p-2 text-emerald-400 hover:text-white rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition border border-emerald-500/20">
                                                        <FaUnlock size={14} />
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleBlock(user._id)}
                                                        title="Block User" 
                                                        className="p-2 text-red-400 hover:text-white rounded-lg bg-red-500/10 hover:bg-red-500/20 transition border border-red-500/20">
                                                        <FaBan size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-16 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-2">
                                                <FaSearch size={24} />
                                            </div>
                                            <p className="text-lg font-medium text-slate-300">No users found</p>
                                            <p className="text-sm">{searchTerm ? `No results match "${searchTerm}"` : "All registered users will appear here."}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                        <span>Showing <strong>{currentUsers.length}</strong> of <strong>{filteredUsers.length}</strong> users</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 bg-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span className="font-semibold">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 bg-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition"
                            >
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md"
                        >
                            <FaTimes size={16} />
                        </button>

                        {/* Header Banner */}
                        <div className={`h-28 w-full ${selectedUser.role === 'admin' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-indigo-600 to-cyan-600'}`}></div>

                        <div className="px-8 pb-8">
                            <div className="flex flex-col items-center -mt-12 mb-6">
                                <div className={`w-24 h-24 rounded-full p-1.5 shadow-xl bg-slate-800 ${selectedUser.role === 'admin' ? 'border-purple-500' : 'border-indigo-500'}`}>
                                    <div className={`w-full h-full rounded-full flex items-center justify-center text-4xl font-bold border-2 border-slate-700 bg-slate-800 ${selectedUser.role === 'admin' ? 'text-purple-400' : 'text-indigo-400'}`}>
                                        {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : <FaUser />}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white mt-3 text-center">{selectedUser.name || 'Unnamed User'}</h2>
                                <div className="flex gap-2 mt-2">
                                    <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide border ${selectedUser.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>
                                        {selectedUser.role || 'User'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500"><FaEnvelope size={14} /></div>
                                        <div className="flex-1 overflow-hidden"><p className="text-xs text-slate-500 font-bold uppercase">Email</p><p className="truncate" title={selectedUser.email}>{selectedUser.email}</p></div>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500"><FaPhone size={14} /></div>
                                        <div><p className="text-xs text-slate-500 font-bold uppercase">Mobile</p><p>{selectedUser.mobile || 'Not provided'}</p></div>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500"><FaIdBadge size={14} /></div>
                                        <div className="flex-1 overflow-hidden"><p className="text-xs text-slate-500 font-bold uppercase">User ID</p><p className="font-mono text-sm truncate">{selectedUser._id}</p></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                        <div className="flex items-center gap-2 mb-1 text-slate-500"><FaCalendarAlt size={12} /><span className="text-xs font-bold uppercase">Joined</span></div>
                                        <p className="text-slate-200 font-medium">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                    {/* Last Login Full Details */}

                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 space-y-3">

                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                                        <FaClock size={12} />
                                        <span>Last Login Details</span>
                                    </div>

                                    {selectedUser?.lastLogin?.date ? (
                                        <>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-400">Date & Time:</span>
                                                <span className="text-white font-medium">
                                                    {new Date(selectedUser.lastLogin.date).toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-400">IP Address:</span>
                                                <span className="text-slate-300">
                                                    {selectedUser.lastLogin.ip || "N/A"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-400">Device:</span>
                                                <span className="text-slate-300">
                                                    {selectedUser.lastLogin.device || "Unknown"}
                                                    {selectedUser.lastLogin.os ? ` (${selectedUser.lastLogin.os})` : ""}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-400">Browser:</span>
                                                <span className="text-slate-300">
                                                    {selectedUser.lastLogin.browser || "Unknown"}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center text-slate-500 text-sm py-2">
                                            No login activity found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all relative">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Edit User</h2>
                                <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white transition">
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        value={editData.name || ''} 
                                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        value={editData.email || ''} 
                                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mobile</label>
                                    <input 
                                        type="text" 
                                        value={editData.mobile || ''} 
                                        onChange={(e) => setEditData({...editData, mobile: e.target.value})}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setIsEditOpen(false)}
                                        className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium flex items-center justify-center gap-2"
                                    >
                                        <FaSave /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;