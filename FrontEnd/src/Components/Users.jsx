import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slice/adminSlice";

const Users = () => {

    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">
                Users
            </h1>

            <div className="bg-slate-800 rounded-lg p-6">

                {loading ? (
                    <p>Loading users...</p>
                ) : (

                    <table className="w-full text-left">

                        <thead className="border-b border-slate-700">

                            <tr>
                                <th className="py-3">Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>User ID</th>
                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user._id} className="border-b border-slate-700">

                                    <td className="py-3">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user._id}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
};

export default Users;