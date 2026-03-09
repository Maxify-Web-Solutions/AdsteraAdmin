import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slice/adminSlice";

const Users = () => {

    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const sortedUsers = [...users].sort((a, b) => {
        if (a.role === "admin") return -1;
        if (b.role === "admin") return 1;
        return 0;
    });

    return (
        <div className="w-full space-y-6">

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Users Management
            </h1>

            {loading && (
                <div className="text-gray-300">
                    Loading users...
                </div>
            )}

            {/* Desktop Table */}
            <div className="hidden md:block bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-900 text-gray-400 text-sm">
                        <tr>
                            <th className="text-left px-6 py-4">Name</th>
                            <th className="text-left px-6 py-4">Email</th>
                            <th className="text-left px-6 py-4">Mobile</th>
                            <th className="text-left px-6 py-4">User ID</th>
                            <th className="text-left px-6 py-4">Role</th>
                        </tr>
                    </thead>

                    <tbody>

                        {sortedUsers.map((user) => {

                            const isAdmin = user.role === "admin";

                            return (
                                <tr
                                    key={user._id}
                                    className={`
                    border-b border-slate-700
                    hover:bg-slate-700 transition
                    ${isAdmin ? "bg-purple-900/40" : ""}
                  `}
                                >

                                    <td className="px-6 py-4 text-white font-semibold flex items-center gap-2">

                                        {user.name}

                                        {isAdmin && (
                                            <span className="text-yellow-400">
                                                👑
                                            </span>
                                        )}

                                    </td>

                                    <td className="px-6 py-4 text-gray-300">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 text-gray-300">
                                        {user.mobile}
                                    </td>

                                    <td className="px-6 py-4 text-xs text-gray-500">
                                        {user._id}
                                    </td>

                                    <td className="px-6 py-4">

                                        {isAdmin ? (
                                            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                                                ADMIN
                                            </span>
                                        ) : (
                                            <span className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full">
                                                USER
                                            </span>
                                        )}

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>


            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">

                {sortedUsers.map((user) => {

                    const isAdmin = user.role === "admin";

                    return (
                        <div
                            key={user._id}
                            className={`
                bg-slate-800 border border-slate-700 rounded-xl p-4
                ${isAdmin ? "bg-purple-900/40" : ""}
              `}
                        >

                            <div className="flex justify-between items-center mb-2">

                                <p className="font-semibold text-white flex items-center gap-2">

                                    {user.name}

                                    {isAdmin && (
                                        <span className="text-yellow-400">
                                            👑
                                        </span>
                                    )}

                                </p>

                                {isAdmin ? (
                                    <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">
                                        ADMIN
                                    </span>
                                ) : (
                                    <span className="bg-slate-600 text-xs px-2 py-1 rounded-full">
                                        USER
                                    </span>
                                )}

                            </div>

                            <p className="text-sm text-gray-400">
                                {user.email}
                            </p>

                            <p className="text-sm text-gray-400">
                                {user.mobile}
                            </p>

                            <p className="text-xs text-gray-500 mt-2 break-all">
                                {user._id}
                            </p>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Users;